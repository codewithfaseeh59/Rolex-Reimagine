# Assets to replace before publishing

AURELIAN is a fictional brand. The files below still contain **placeholder / third-party imagery and models**
(carried over from the pre-rebrand version) and must be swapped for your own original renders.
Keep the same file names and formats (WebP, max 1200px wide) so no code changes are needed.

| File | Used on | Needs |
|------|---------|-------|
| `Assets/Watch-Model/aurelian.glb` | Home hero (3D model) | Original 3D watch model (the current one is a third-party model). Keep it under ~3 MB; Draco/meshopt compression recommended |
| `Assets/Images/aurelian-abyss.webp` | Home, Collection, social preview | Diver's watch render, 800x800 |
| `Assets/Images/aurelian-solstice.webp` | Home, Collection | Classic dress watch render, 800x1000 |
| `Assets/Images/aurelian-sovereign.webp` | Home, Collection | Precious-metal watch render, 800x800 |
| `Assets/Images/aurelian-voyager.webp` | Collection | Dual-time watch render, 800x1200 |
| `Assets/Images/aurelian-circuit.webp` | Collection | Racing chronograph render, 736x1308 |
| `Assets/Images/aurelian-origin.webp` | Collection | Everyday watch render, 600x750 |
| `Assets/Images/craft-1.webp` | Home (craft section), Craftsmanship | Movement / components visual |
| `Assets/Images/craft-2.webp` | Home (craft section), Craftsmanship | Case material (Aurasteel) visual |
| `Assets/Images/craft-3.webp` | Home (craft section), Craftsmanship | Precision-testing visual |
| `Assets/Images/craft-4.webp` | Home (craft section), Craftsmanship | Self-winding rotor visual |
| `Assets/Images/founder.webp` | About | Portrait of the fictional founder (illustration or AI-free stock you own) |

If you change an image's pixel size, update the `width`/`height` attributes on its `<img>` tags.

Other things to finish:
- `og:image` / `twitter:image` use `/Assets/Images/aurelian-abyss.webp`. Once the final domain is known, make them absolute
  (`https://your-domain/Assets/Images/...`) — most crawlers ignore relative URLs.
- `_originals/` (git-ignored, not deployed) holds the pre-rebrand originals. Delete it once your renders are in.
  Those files are still present in earlier git history.
