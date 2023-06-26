import styled from "styled-components";
import book from "../../assets/book.txt?raw";
import { useState } from "react";
import { Presentation } from "./sections/presentation/Presentation";
import { TextPage } from "./sections/text/Text";
import { ActionsSection } from "./sections/actions/Actions";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import { KNOWN_WORDS_KEY } from "../../utils/consts";

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
  const [memory, setMemory] = useLocalStorage<any>(KNOWN_WORDS_KEY, {});
  const [selected, setSelected] = useState<any>({});

  return (
    <StyledPage>
      <Presentation
        chapterCount={chapters.length}
        chapter={chapter}
        setChapter={setChapter}
      />
      <TextPage
        chapterNumber={chapter + 1}
        book={chapters[chapter]}
        memory={memory}
        selected={selected}
        setSelected={setSelected}
      />
      <ActionsSection
        selected={selected}
        setSelected={setSelected}
        memory={memory}
        setMemory={setMemory}
      />
    </StyledPage>
  );
}
