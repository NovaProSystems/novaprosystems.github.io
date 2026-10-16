# NovaPro Systems — web

Sitio estático (HTML + CSS + un poco de JS, sin build) para GitHub Pages en **https://novaprosystems.es**.

```
index.html          español (principal)
en/index.html       inglés
de/index.html       alemán
404.html            página de error (trilingüe)
CNAME               dominio propio para GitHub Pages
sitemap.xml         sitemap con las tres versiones (hreflang)
assets/css/site.css estilos (negro, amarillo #fff200 y blanco del logo)
assets/js/site.js   menú móvil, pestañas de capturas y animaciones
assets/img/         logos SVG, iconos, imagen social y capturas de Obradia
```

Las rutas son absolutas (`/assets/...`): el sitio debe servirse en la raíz de un dominio, no bajo `/repo/`.

Al cambiar un texto, cámbialo en los tres `index.html`.

## Probar en local

```bash
python3 -m http.server 8088
```

y abrir http://localhost:8088 (http://localhost:8088/en/, http://localhost:8088/de/).

## Publicar en GitHub Pages

1. Crear el repositorio en la cuenta de GitHub de NovaPro y subir esta carpeta a `main`.
2. *Settings → Pages → Build and deployment*: **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. *Settings → Pages → Custom domain*: `novaprosystems.es` (ya está en el fichero `CNAME`).
4. Recomendado: verificar el dominio en *Settings de la cuenta → Pages → Add a domain* (registro TXT) para que nadie más pueda usarlo en GitHub.
5. Cuando el DNS esté propagado y GitHub emita el certificado, marcar **Enforce HTTPS**.

## DNS en Strato

En Strato: *Dominios → Gestionar dominio → novaprosystems.es → DNS*.

| Registro | Nombre | Ahora | Poner |
|---|---|---|---|
| A | `novaprosystems.es` | `217.160.0.39` (aparcamiento de Strato) | `185.199.108.153` |
| AAAA | `novaprosystems.es` | `2001:8d8:100f:f000::200` | `2606:50c0:8000::153` (o quitarlo) |
| CNAME | `www` | `novaprosystems.es` | `<usuario>.github.io` |

- Strato solo deja un registro A por nombre: con uno de los cuatro de GitHub Pages basta (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`).
- Hay que cambiar también el **AAAA**: si se queda el de Strato, quien entre por IPv6 verá la página de aparcamiento.
- **No tocar** `obradia.novaprosystems.es` (A `79.117.49.89`) ni los registros MX.
- Comprobar la propagación:

```bash
dig +short A novaprosystems.es @1.1.1.1
```

## Actualizar capturas de Obradia

Las capturas (`assets/img/obradia-*.webp`) se sacaron de la demo local con datos ficticios, a 1440×900 y escala 2, y se convirtieron con `cwebp -q 82 -resize 1600 0`.
