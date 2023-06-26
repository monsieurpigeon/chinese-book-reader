import styled from "styled-components";
import { COLORS, PUNCTUATION } from "../../../../utils/consts";
import { useMemo } from "react";

interface SentenceProps {
  sentence: string[];
  memory: any;
  selected: any;
  setSelected: any;
  size: number;
}

const StyledWord = styled.div<{ $size: number }>`
  user-select: none;
  padding: 2px 4px;
  cursor: pointer;
  font-size: ${({ $size }) => $size}em;

  border: 1px solid transparent;
  background-color: #242424;
  flex-grow: 1;

  z-index: 1;
  &:hover {
    border: 1px solid #696969;
    background-color: #333333;
  }

  &.known {
    border: 1px solid transparent;
    background-color: #333333;
    cursor: inherit;
  }

  &.selected {
    border: 1px solid aqua;
    background-color: #333333;
  }
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
`;

const StyledSentence = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: start;
  padding: 5px;
  background-color: #242424;
  border-radius: 5px;
  border: 1px solid transparent;

  &.full {
    border: 1px solid ${COLORS.highlight};

    background-color: #333333;
  }

  &::after {
    content: "";
    flex: auto;
    flex-grow: 500;
  }
`;

export function Sentence({
  sentence,
  memory,
  selected,
  setSelected,
  size,
}: SentenceProps) {
  const handleMemorize = (word: string) => {
    setSelected((memory: any) => ({ ...memory, [word]: !memory[word] }));
  };

  const isFull = useMemo(() => {
    return sentence.every((word) => memory[word] || PUNCTUATION.includes(word));
  }, [memory, sentence]);

  return (
    <StyledSentence className={isFull ? "full" : ""}>
      {sentence.map((word: string, index: number) => {
        const isPoncutation = PUNCTUATION.includes(word);
        return (
          <StyledWord
            onClick={() =>
              !memory[word] && !isPoncutation && handleMemorize(word)
            }
            key={index}
            className={`${memory[word] || isPoncutation ? "known" : ""} ${
              selected[word] ? "selected" : ""
            }`}
            $size={size}
          >
            {word}
          </StyledWord>
        );
      })}
    </StyledSentence>
  );
}
