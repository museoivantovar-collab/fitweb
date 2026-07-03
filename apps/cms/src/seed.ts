import type { Payload } from "payload";
import sharp from "sharp";

const COLORS: Array<{ r: number; g: number; b: number }> = [
  { r: 180, g: 100, b: 80 },
  { r: 80, g: 130, b: 180 },
  { r: 140, g: 180, b: 90 },
  { r: 200, g: 160, b: 60 },
  { r: 100, g: 80, b: 160 },
  { r: 60, g: 160, b: 150 },
  { r: 200, g: 100, b: 130 },
  { r: 90, g: 140, b: 100 },
  { r: 170, g: 90, b: 60 },
  { r: 60, g: 100, b: 180 },
  { r: 150, g: 60, b: 90 },
  { r: 80, g: 170, b: 130 },
  { r: 200, g: 140, b: 80 },
  { r: 100, g: 60, b: 160 },
  { r: 70, g: 150, b: 170 },
];

const OBRAS: Array<{ nombre: string; año: number; hasImage: boolean }> = [
  { nombre: "Sin título",          año: 1970, hasImage: true  },
  { nombre: "Composición I",       año: 1971, hasImage: true  },
  { nombre: "Estudio en azul",     año: 1972, hasImage: false },
  { nombre: "Forma y espacio",     año: 1973, hasImage: true  },
  { nombre: "Abstracción I",       año: 1974, hasImage: true  },
  { nombre: "Sin título II",       año: 1975, hasImage: false },
  { nombre: "Composición II",      año: 1976, hasImage: true  },
  { nombre: "Paisaje interior",    año: 1977, hasImage: true  },
  { nombre: "Sin título III",      año: 1978, hasImage: false },
  { nombre: "Estudio geométrico",  año: 1979, hasImage: true  },
  { nombre: "Composición III",     año: 1980, hasImage: true  },
  { nombre: "Sin título IV",       año: 1981, hasImage: false },
  { nombre: "Forma expandida",     año: 1982, hasImage: true  },
  { nombre: "Abstracción II",      año: 1983, hasImage: true  },
  { nombre: "Sin título V",        año: 1984, hasImage: false },
  { nombre: "Serie cromática I",   año: 1985, hasImage: true  },
  { nombre: "Serie cromática II",  año: 1986, hasImage: true  },
  { nombre: "Sin título VI",       año: 1987, hasImage: false },
  { nombre: "Composición IV",      año: 1988, hasImage: true  },
  { nombre: "Estudio de luz",      año: 1989, hasImage: true  },
  { nombre: "Sin título VII",      año: 1991, hasImage: false },
  { nombre: "Composición V",       año: 1994, hasImage: true  },
  { nombre: "Última forma",        año: 1998, hasImage: true  },
];

async function makeImageBuffer(color: { r: number; g: number; b: number }) {
  return sharp({
    create: { width: 800, height: 600, channels: 3, background: color },
  })
    .jpeg({ quality: 80 })
    .toBuffer();
}

export async function seedObras(payload: Payload) {
  let colorIdx = 0;

  for (const obra of OBRAS) {
    let imagenId: string | number | undefined;

    if (obra.hasImage) {
      const buf = await makeImageBuffer(COLORS[colorIdx % COLORS.length]);
      colorIdx++;

      const filename = `obra-${obra.año}-${obra.nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")}.jpg`;

      const media = await payload.create({
        collection: "media",
        data: { alt: obra.nombre },
        file: {
          data: buf,
          mimetype: "image/jpeg",
          name: filename,
          size: buf.length,
        },
      });

      imagenId = media.id;
    }

    await payload.create({
      collection: "obras",
      data: {
        nombre: obra.nombre,
        año: obra.año,
        ...(imagenId !== undefined ? { imagen: imagenId } : {}),
      },
    });

    payload.logger.info(
      `Seeded: ${obra.año} — ${obra.nombre}${imagenId !== undefined ? " (con imagen)" : ""}`,
    );
  }

  payload.logger.info("Seed de obras completado.");
}
