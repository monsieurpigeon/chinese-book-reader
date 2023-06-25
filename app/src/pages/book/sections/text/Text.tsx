import { useMemo, useState } from "react";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";
import styled from "styled-components";

interface TextProps {
  chapterNumber: number;
  book: string;
  memory: any;
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
}

const StyledWord = styled.div<{ $size: number }>`
  user-select: none;
  padding: 2px 4px;
  cursor: pointer;
  font-size: ${({ $size }) => $size}em;

  border: 1px solid #161616;
  background-color: #242424;
  flex-grow: 1;

  z-index: 1;
  &:hover {
    border: 1px solid #696969;
    z-index: 2;
    background-color: #333333;
  }

  &.known {
    border: 1px solid transparent;
    background-color: #333333;
  }

  &.selected {
    border: 1px solid aqua;
    background-color: #333333;
    border-radius: 8px;
  }
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
`;

const StyledBook = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  width: 600px;
  row-gap: 5px;
  padding: 10px;
  border-radius: 5px;
  background-color: #333333;
  justify-content: center;

  &::after {
    content: "";
    flex: auto;
    flex-grow: 25;
  }
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledChapter = styled.div`
  background-color: #333333;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  font-size: 1.5em;
`;

const StyledZoom = styled.div`
  display: flex;
  gap: 5px;
  height: 32px;
  size: 3em;
  svg {
    opacity: 0.5;
  }
  svg:hover {
    opacity: 1;
  }
`;
const ponctuation = [
  "",
  "（",
  "）",
  "…",
  "：",
  "，",
  "。",
  "\\",
  "”",
  "“",
  "‘",
  "！",
  "？",
  "\n",
  "、",
  "《",
  "》",
  '"',
];

export function TextPage({
  chapterNumber,
  book,
  memory,
  selected,
  setSelected,
}: TextProps) {
  const wholeBook = useMemo(() => book.split("/").slice(0, 1000), [book]);
  const handleMemorize = (word: string) => {
    setSelected((memory: any) => ({ ...memory, [word]: !memory[word] }));
  };

  const [size, setSize] = useState(1.4);

  return (
    <StyledSection>
      <StyledChapter>
        <div>Chapter {chapterNumber}</div>
        <StyledZoom>
          <div
            className="clickable"
            onClick={() => setSize((v) => Math.max(0.2, v - 0.1))}
          >
            <PiMinusBold />
          </div>
          <div
            className="clickable"
            onClick={() => setSize((v) => Math.min(3, v + 0.1))}
          >
            <PiPlusBold />
          </div>
        </StyledZoom>
      </StyledChapter>
      <StyledBook className="hide-scroll">
        {wholeBook.map((word: string, index: number) => {
          const isPoncutation = ponctuation.includes(word);
          return (
            <StyledWord
              onClick={() =>
                !memory[word] && !isPoncutation && handleMemorize(word)
              }
              key={index}
              className={`${(memory[word] || isPoncutation) && "known"} ${
                selected[word] && "selected"
              }`}
              $size={size}
            >
              {word}
            </StyledWord>
          );
        })}
      </StyledBook>
    </StyledSection>
  );
}
