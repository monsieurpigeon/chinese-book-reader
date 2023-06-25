import { useMemo } from "react";
import styled, { keyframes } from "styled-components";

const logoHop = keyframes`
    0% { transform: translateY(0); }
    25% {transform: translateY(-2px);}
    50%{transform: translateY(0);}
    75%  { transform: translateY(2px); }
    100%   { transform: translateY(0); }
`;

const StyledPresentation = styled.div`
  background-color: #333333;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .logo {
    font-size: 1.8em;
    margin-bottom: 20px;
    background-color: #242424;
    border-radius: 5px;
    font-family: "ZCOOL KuaiLe", sans-serif;
    &:hover {
      div {
        animation: ${logoHop} 1s ease-in-out infinite;
      }
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 5px;
    .title {
      font-weight: bold;
      font-size: 1.3em;
    }
    .author {
      opacity: 0.5;
    }
    writing-mode: vertical-lr;
  }
  .chapters {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-height: 350px;
    overflow-y: auto;

    .chapter {
      border-radius: 5px;
      background-color: #242424;
      border: 1px solid transparent;
      &:hover {
        background-color: #333333;
      }
      &.selected {
        background-color: #333333;
        border: 1px solid yellow;
        opacity: 0.8;
      }
    }
  }
`;

interface PresentationProps {
  chapterCount: number;
  chapter: number;
  setChapter: React.Dispatch<React.SetStateAction<number>>;
}

export function Presentation({
  chapterCount,
  chapter,
  setChapter,
}: PresentationProps) {
  const chapters = useMemo(
    () => new Array(chapterCount).fill(undefined),
    [chapterCount]
  );

  return (
    <StyledPresentation>
      <div>
        <div className="logo clickable">
          <div>马</div>
        </div>
        <div className="header">
          <div className="title">小王子</div>
          <div className="author">安托万·德·圣-修伯里</div>
        </div>
      </div>

      <div className="chapters hide-scroll">
        {chapters.map((_, chap: number) => (
          <div
            className={`chapter clickable ${chap === chapter && "selected"}`}
            onClick={() => setChapter(chap)}
            key={chap}
          >
            {chap + 1}
          </div>
        ))}
      </div>
    </StyledPresentation>
  );
}
