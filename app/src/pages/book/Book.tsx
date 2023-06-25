import styled from "styled-components";
import book from "../../assets/book.txt?raw";
import { useState } from "react";
import { Presentation } from "./sections/presentation/Presentation";
import { TextPage } from "./sections/text/Text";
import { ActionsSection } from "./sections/actions/Actions";

const StyledPage = styled.div`
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  height: 100%;
  padding: 5px;
  gap: 5px;
`;

const chapters = book.split("\n/#/\n");

export function BookPage() {
  const [chapter, setChapter] = useState(0);
  const [memory, setMemory] = useState<any>({});

  return (
    <StyledPage>
      <Presentation chapter={chapter} setChapter={setChapter} />
      <TextPage
        book={chapters[chapter]}
        memory={memory}
        setMemory={setMemory}
      />
      <ActionsSection memory={memory} />
    </StyledPage>
  );
}
