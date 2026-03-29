import { useCallback, useEffect, useMemo, useState } from "react";

type Rotation = {
  row: number;
  col: number;
  rot: number;
  zIndex: number;
};

type ScatterHoverGalleryProps = {
  images: string[];
  columns?: number;
  cardWidth?: number;
  cardHeight?: number;
  visibleCount?: number;
  className?: string;
};

const chunkArray = <T,>(items: T[], chunkSize: number): T[][] => {
  const safeChunk = Math.max(1, chunkSize);
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += safeChunk) {
    chunks.push(items.slice(index, index + safeChunk));
  }
  return chunks;
};

const shuffle = (values: number[]) =>
  values
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((entry) => entry.value);

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export default function ScatterHoverGallery({
  images,
  columns = 3,
  cardWidth = 240,
  cardHeight = 170,
  visibleCount = 6,
  className,
}: ScatterHoverGalleryProps) {
  const [isHover, setIsHover] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [rotations, setRotations] = useState<Record<string, Rotation>>({});

  const rows = useMemo(() => chunkArray(images, columns), [images, columns]);
  const rowsCount = rows.length;
  const visibleRows = Math.max(1, Math.ceil(visibleCount / columns));
  const viewportHeight = Math.max(cardHeight, visibleRows * cardHeight + Math.max(0, visibleRows - 1) * 40);

  const getCenter = useCallback(
    (row: number, col: number) => {
      const rowOffset = rowsCount / 2 - row;
      let translateY = rowOffset * (cardHeight + 28) * 0.54;

      if (!(rowsCount % 2) && !translateY) {
        translateY -= cardHeight * 0.35;
      }

      const colOffset = Math.floor(columns / 2 - col);
      let translateX = colOffset * (cardWidth + 22) * 0.52;

      if (!(columns % 2) && !translateX) {
        translateX -= cardWidth * 0.28;
      }

      return { translateY, translateX };
    },
    [cardHeight, cardWidth, columns, rowsCount]
  );

  const setRandomRotations = useCallback(() => {
    const indices = shuffle(Array.from({ length: images.length }, (_, index) => index + 1));
    const nextRotations: Record<string, Rotation> = {};

    rows.forEach((row, rowIndex) => {
      row.forEach((_image, colIndex) => {
        const center = getCenter(rowIndex, colIndex);

        const translateYRange = Math.round((cardHeight + 50) * 0.5);
        const translateXRange = Math.round((cardWidth + 36) * 0.5);

        nextRotations[`${rowIndex},${colIndex}`] = {
          row: center.translateY + randInt(-translateYRange, translateYRange),
          col: center.translateX + randInt(-translateXRange, translateXRange),
          rot: randInt(-58, 58),
          zIndex: indices.shift() ?? 1,
        };
      });
    });

    setRotations(nextRotations);
  }, [cardHeight, cardWidth, getCenter, images.length, rows]);

  useEffect(() => {
    if (!images.length) return;
    setRandomRotations();
    setIsFirstRender(false);
  }, [images.length, isHover, setRandomRotations]);

  if (!images.length) {
    return null;
  }

  const getPostcardStyle = (row: number, col: number) => {
    const rotation = rotations[`${row},${col}`];

    if (!rotation) {
      return {
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
      };
    }

    return {
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      transform: `translateX(${rotation.col}px) translateY(${rotation.row}px) rotateZ(${rotation.rot}deg)`,
      zIndex: rotation.zIndex,
    };
  };

  return (
    <div
      className={`ffp-gallery ${className ?? ""} ${isHover ? "ffp-gallery-display" : ""}`.trim()}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="ffp-gallery__viewport" style={{ maxHeight: `${viewportHeight}px` }}>
        {rows.map((row, rowIndex) => (
          <div className="ffp-gallery__row" key={`row-${rowIndex}`}>
            {row.map((image, imageIndex) => (
              <div
                className="ffp-gallery__row__image"
                style={{ width: `${100 / columns}%` }}
                key={`${image}-${rowIndex}-${imageIndex}`}
              >
                <div
                  className="ffp-postcard ffp-postcard-transition"
                  style={!isFirstRender ? getPostcardStyle(rowIndex, imageIndex) : { width: `${cardWidth}px`, height: `${cardHeight}px` }}
                >
                  <div className="ffp-postcard__front">
                    <img src={image} alt={`Gallery ${rowIndex * columns + imageIndex + 1}`} className="ffp-postcard__img" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
