import styled from "styled-components";

const StyledPresentation = styled.div`
  background-color: #333333;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
  chapter: number;
  setChapter: React.Dispatch<React.SetStateAction<number>>;
}

export function Presentation({ chapter, setChapter }: PresentationProps) {
  return (
    <StyledPresentation>
      <div className="header">
        <div className="title">小王子</div>
        <div className="author">安托万·德·圣-修伯里</div>
      </div>
      <div className="chapters">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((chap: number) => {
          return (
            <div
              className={`chapter clickable ${chap === chapter && "selected"}`}
              onClick={() => setChapter(chap)}
            >
              {chap}
            </div>
          );
        })}
      </div>
    </StyledPresentation>
  );
}
