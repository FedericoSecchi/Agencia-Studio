# Orbita — imágenes del caso de estudio

## Ubicación

Todas las imágenes del proyecto **Orbita** deben estar en:

```
src/assets/projects/orbita/
```

## Archivos que espera el sistema

El código usa **exactamente** estos nombres. Formato actual: **PNG**.

| Archivo          | Uso en la UI                          |
|------------------|----------------------------------------|
| `orbita-hero.png` | Imagen principal del caso (hero)       |
| `orbita-01.png`   | Galería 1 (después de "Tarea")        |
| `orbita-02.png`   | Galería 2 (después de "Idea")         |
| `orbita-03.png`   | Galería 3                             |
| `orbita-04.png`   | Galería 4                             |
| `orbita-05.png`   | Galería 5                             |
| `orbita-06.png`   | Galería 6                             |

## Formato

- **Formato:** PNG (referenciado en `src/data/projects.ts`). Para usar JPG o WebP habría que actualizar los imports.
- **Resolución:** La hero suele ser ancha. Las de galería según diseño.

## Cómo reemplazar

1. Coloca los archivos en `src/assets/projects/orbita/` con los nombres indicados.
2. No hace falta tocar código si mantienes los mismos nombres y extensión.
3. Ejecuta `npm run build` o `npm run dev` y abre `/project/orbita` para comprobar.
