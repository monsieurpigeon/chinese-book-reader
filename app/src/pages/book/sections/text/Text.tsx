import { useMemo } from "react";
import styled from "styled-components";

interface TextProps {
  book: string;
  memory: any;
  setMemory: React.Dispatch<React.SetStateAction<any>>;
}

const StyledWord = styled.div`
  padding: 2px;
  border-bottom: 1px solid green;
  cursor: pointer;
  &:hover {
    background-color: green;
  }

  &.known {
    background-color: green;
  }
`;

const StyledParagraph = styled.div`
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const StyledBook = styled.div`
  overflow-y: auto;
  padding: 25px;
  border-radius: 5px;
  background-color: #333333;
`;

export function TextPage({ book, memory, setMemory }: TextProps) {
  const wholeBook = useMemo(() => book.split("/").slice(0, 1000), [book]);
  const handleMemorize = (word: string) => {
    setMemory((memory: any) => ({ ...memory, [word]: !memory[word] }));
  };

  return (
    <StyledBook className="hide-scroll">
      <StyledParagraph>
        {wholeBook.map((word: string, index: number) => {
          return (
            <StyledWord
              onClick={() => handleMemorize(word)}
              key={index}
              className={memory[word] && "known"}
            >
              {word}
            </StyledWord>
          );
        })}
      </StyledParagraph>
    </StyledBook>
  );
}
