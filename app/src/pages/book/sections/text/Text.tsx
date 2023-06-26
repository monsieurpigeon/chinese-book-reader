import { useMemo, useState } from "react";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";
import styled from "styled-components";
import { Sentence } from "./Sentence";

interface TextProps {
  chapterNumber: number;
  book: string;
  memory: any;
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
}

const StyledBook = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 600px;
  gap: 5px;

  padding: 5px;
  border-radius: 5px;
  background-color: #333333;

  height: 100%;
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

export function TextPage({
  chapterNumber,
  book,
  memory,
  selected,
  setSelected,
}: TextProps) {
  const wholeBook = useMemo(
    () =>
      book
        .split("\n")
        .map((sentence) => sentence.split("/").filter((word) => word !== "")),
    [book]
  );

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
        {wholeBook.map((sentence: string[], index: number) => {
          return (
            <Sentence
              key={index}
              sentence={sentence}
              memory={memory}
              selected={selected}
              setSelected={setSelected}
              size={size}
            />
          );
        })}
      </StyledBook>
    </StyledSection>
  );
}
