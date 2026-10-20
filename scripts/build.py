"""Build the static GitHub Pages artifact using centralized route metadata."""
from pathlib import Path
import argparse, html, json, re, shutil
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
def metadata_block(base, path, meta, image):
    e=html.escape
    tags=[
        '<!-- SEO:START -->',
        '<title>'+e(meta['title'])+'</title>',
        '<meta name="description" content="'+e(meta['description'],quote=True)+'">',
        '<meta name="robots" content="index,follow">',
        '<link rel="canonical" href="'+base+path+'">',
        '<meta property="og:type" content="website">',
        '<meta property="og:locale" content="pt_BR">',
        '<meta property="og:site_name" content="Gama Escola de Música">',
        '<meta property="og:title" content="'+e(meta['title'],quote=True)+'">',
        '<meta property="og:description" content="'+e(meta['description'],quote=True)+'">',
        '<meta property="og:url" content="'+base+path+'">',
        '<meta property="og:image" content="'+base+image+'">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta property="og:image:alt" content="Criança ao piano, imagem de apresentação da Gama Escola de Música">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="twitter:title" content="'+e(meta['title'],quote=True)+'">',
        '<meta name="twitter:description" content="'+e(meta['description'],quote=True)+'">',
        '<meta name="twitter:image" content="'+base+image+'">',
        '<!-- SEO:END -->'
    ]
    return '\n'.join(tags)

def build(out):
    config=json.loads((ROOT/'seo.json').read_text())
    base=config['base_url'].rstrip('/')
    out=out.resolve()
    if out.parent!=ROOT or out.name not in {'site','dist','build','out'}:raise ValueError('Use a dedicated build directory inside this project.')
    if out.exists():shutil.rmtree(out)
    out.mkdir(parents=True)
    for name in ['styles.css','script.js','seo-page.js','robots.txt','CNAME','.nojekyll']:
        shutil.copy2(ROOT/name,out/name)
    shutil.copytree(ROOT/'assets',out/'assets')
    for route,meta in config['routes'].items():
        if not route.startswith('/') or not route.endswith('/') or '..' in route:
            raise ValueError('Invalid route: '+route)
        relative=Path(route.lstrip('/'))/'index.html'
        source=ROOT/relative
        content=source.read_text()
        content,n=re.subn(r'<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->',
            lambda _:metadata_block(base,route,meta,config['image']),content)
        if n!=1:raise ValueError('Missing or duplicate metadata block: '+str(source))
        target=out/relative
        target.parent.mkdir(parents=True,exist_ok=True)
        target.write_text(content)
    ET.register_namespace('','http://www.sitemaps.org/schemas/sitemap/0.9')
    ns='{http://www.sitemaps.org/schemas/sitemap/0.9}'
    sitemap=ET.Element(ns+'urlset')
    for route in config['routes']:
        entry=ET.SubElement(sitemap,ns+'url')
        ET.SubElement(entry,ns+'loc').text=base+route
    ET.indent(sitemap)
    ET.ElementTree(sitemap).write(out/'sitemap.xml',encoding='utf-8',xml_declaration=True)
    shutil.copy2(out/'sitemap.xml',ROOT/'sitemap.xml')
    print('Built',len(config['routes']),'static HTML routes in',out)

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--out',default=str(ROOT/'site'))
    build(Path(parser.parse_args().out))
