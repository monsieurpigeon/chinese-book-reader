import styled, { keyframes } from "styled-components";

const logoHop = keyframes`
    from { transform: translateY(5px); }
    to   { transform: translateY(-5px); }
`;

const StyledPresentation = styled.div`
  background-color: #333333;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .logo {
    font-size: 3em;
    font-family: "ZCOOL KuaiLe", sans-serif;
    &:hover {
      animation: ${logoHop} 1s ease-in-out infinite;
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
    height: 350px;
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
  chapter: number;
  setChapter: React.Dispatch<React.SetStateAction<number>>;
}

export function Presentation({ chapter, setChapter }: PresentationProps) {
  return (
    <StyledPresentation>
      <div>
        <div className="logo clickable">马</div>
        <div className="header">
          <div className="title">小王子</div>
          <div className="author">安托万·德·圣-修伯里</div>
        </div>
      </div>

      <div className="chapters hide-scroll">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
          (chap: number) => {
            return (
              <div
                className={`chapter clickable ${
                  chap === chapter && "selected"
                }`}
                onClick={() => setChapter(chap)}
                key={chap}
              >
                {chap + 1}
              </div>
            );
          }
        )}
      </div>
    </StyledPresentation>
  );
}
