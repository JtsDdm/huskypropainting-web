# Husky Pro Painting — huskypropainting.com

Sitio web profesional con SEO local para Northern California.
Stack: HTML + CSS + Vanilla JS · Sin frameworks · Sin dependencias.

---

## Estructura del proyecto

```
husky-pro-painting/
├── index.html              ← Homepage principal
├── sitemap.xml             ← Subir a Google Search Console
├── robots.txt              ← Instrucciones para Google
├── README.md               ← Este archivo
│
├── css/
│   ├── variables.css       ← Colores, fuentes, espaciado (editar aquí primero)
│   ├── base.css            ← Reset, tipografía, botones
│   ├── nav.css             ← Navegación
│   └── sections.css        ← Todas las secciones
│
├── js/
│   ├── main.js             ← Animaciones, nav, formulario
│   └── analytics.js        ← Meta Pixel + GA4 (descomentar con IDs)
│
├── images/
│   ├── logo.png            ← Logo Husky Pro Painting
│   └── og-image.jpg        ← Imagen para Facebook/WhatsApp (1200x630px)
│
├── pages/
│   ├── redding-ca.html     ← SEO local Redding
│   ├── shasta-ca.html      ← SEO local Shasta
│   ├── palo-cedro-ca.html  ← SEO local Palo Cedro
│   ├── exterior-painting.html
│   ├── interior-painting.html
│   └── commercial-painting.html
│
└── blog/
    ├── index.html          ← Índice del blog
    ├── how-much-does-exterior-painting-cost-redding-ca.html
    ├── best-exterior-paint-northern-california-heat.html
    ├── how-to-prepare-house-for-exterior-painting.html
    └── ... (más artículos)
```

---

## Cómo hacer cambios en VS Code

1. Abre la carpeta del proyecto en VS Code: `File → Open Folder`
2. Para cambiar el color naranja: edita `css/variables.css` → `--orange`
3. Para cambiar textos: edita `index.html`
4. Para agregar una página de blog: duplica cualquier archivo en `/blog/`

---

## Cómo subir a GitHub (primera vez)

```bash
# 1. Instala Git si no lo tienes: https://git-scm.com
# 2. En VS Code abre la terminal: Terminal → New Terminal

# Inicializa el repositorio
git init
git add .
git commit -m "Initial commit — Husky Pro Painting website"

# Crea un repo en github.com y conecta (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/huskypropainting.git
git branch -M main
git push -u origin main
```

---

## Cómo hacer cambios después (flujo normal)

```bash
# Siempre trabaja en una rama nueva para no romper main
git checkout -b fix/cambio-de-color

# Haz tus cambios en VS Code...

# Guarda los cambios
git add .
git commit -m "Cambia color del botón en hero"

# Sube la rama a GitHub
git push origin fix/cambio-de-color

# En GitHub.com: crea un Pull Request y fusiona a main
# Vercel detecta el merge y publica automáticamente en <2 minutos
```

---

## Conectar a Vercel (deploy automático)

1. Ve a **vercel.com** → Sign up con tu cuenta de GitHub
2. Click **"Add New Project"** → selecciona el repo `huskypropainting`
3. Vercel detecta que es HTML estático → click **Deploy**
4. En Settings → Domains → agrega `huskypropainting.com`
5. Sigue las instrucciones para apuntar el DNS de tu dominio a Vercel

Cada vez que hagas `git push` a `main`, Vercel publica en 30 segundos.

---

## Activar Meta Pixel y Google Analytics

1. Abre `js/analytics.js`
2. Reemplaza `PIXEL_ID` con tu ID de Meta (ej: `1234567890123456`)
3. Reemplaza `GA4_ID` con tu ID de GA4 (ej: `G-XXXXXXXXXX`)
4. Descomenta los bloques de código (quita los `/*` y `*/`)
5. En `index.html` descomenta las líneas del script de GA4

---

## Integrar widgets de GHL

Busca estos comentarios en `index.html` y pega el código embed de GHL:

```html
<!-- GHL Form Widget -->
<div id="ghl-form-widget"> ← aquí

<!-- GHL Calendar Widget -->
<div id="ghl-calendar-widget"> ← aquí

<!-- GHL Chat Widget -->
<div id="ghl-chat-widget"> ← aquí

<!-- GHL Reviews Widget -->
<div id="ghl-reviews-widget"> ← aquí
```

---

## Google Search Console

Después de hacer el deploy en Vercel:
1. Ve a **search.google.com/search-console**
2. Agrega propiedad → `huskypropainting.com`
3. Verifica con el método de archivo HTML o DNS
4. Envía el sitemap: `https://huskypropainting.com/sitemap.xml`

---

## Contacto del desarrollador

Para cambios, nuevas páginas o integraciones:
Trabaja con Claude en claude.ai — pega el archivo que quieres editar
y describe el cambio. Claude edita directamente el código.
