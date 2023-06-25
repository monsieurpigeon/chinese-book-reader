import styled from "styled-components";
import {
  PiArrowFatDownBold,
  PiArticleBold,
  PiEyeBold,
  PiEyeClosedBold,
  PiFolderNotchPlusBold,
  PiFolderSimpleDashedBold,
} from "react-icons/pi";
import csv from "../../../../assets/list.csv";
import { useState } from "react";

const StyledActions = styled.div`
  background-color: #333333;
  display: flex;
  flex-direction: column;
  padding: 3px;
  border-radius: 5px;
`;

const StyledActionBar = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 5px;
  padding: 5px;
`;

const StyledVocabulary = styled.div`
  overflow-y: auto;
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 5px;
  background-color: #242424;
  border: 5px solid #242424;

  .known {
    .hanzi {
      background-color: #333333;
      border: 1px solid yellow;
      opacity: 0.8;
    }
  }
`;

const StyledVocabularyCard = styled.div`
  background-color: #333333;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid transparent;

  &.selected {
    border: 1px solid blue;
    background-color: #454545;
    opacity: 0.8;
  }

  .hanzi {
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 5px 10px;
    background-color: #242424;
  }

  .frequency {
  }
`;

interface ActionProps {
  memory: any;
}

interface Char {
  hanzi: string;
  frequency: string;
}

export function ActionsSection({ memory }: ActionProps) {
  const [showKnown, setShowKnown] = useState(true);
  const [selected, setSelected] = useState<any>({});

  return (
    <StyledActions>
      <StyledActionBar>
        <div className="clickable" title="import known words">
          <PiArrowFatDownBold className="action-icon" />
        </div>
        <div
          className="clickable"
          title="copy selected words to clipboard"
          onClick={() => {
            const text = Object.keys(selected).join("\n");
            console.log(text);
            navigator.clipboard.writeText(text);
          }}
        >
          <PiFolderNotchPlusBold className="action-icon" />
        </div>
        <div
          className="clickable"
          title="remove all selected words"
          onClick={() => setSelected({})}
        >
          <PiFolderSimpleDashedBold className="action-icon" />
        </div>
        <div
          className="clickable"
          title={showKnown ? "hide known words" : "show known words"}
          onClick={() => {
            setShowKnown((v) => !v);
          }}
        >
          {showKnown ? (
            <PiEyeBold className="action-icon" />
          ) : (
            <PiEyeClosedBold className="action-icon" />
          )}
        </div>
      </StyledActionBar>

      <StyledVocabulary className="hide-scroll">
        {csv
          .filter((el: Char) => {
            if (!showKnown) {
              return !memory[el.hanzi];
            } else {
              return true;
            }
          })
          .map((el: Char, index: number) => (
            <StyledVocabularyCard
              key={index}
              className={`${memory[el.hanzi] && "known"} ${
                selected[el.hanzi] && "selected"
              }`}
              onClick={() =>
                setSelected((v: any) => ({
                  ...v,
                  [el.hanzi]: !v[el.hanzi],
                }))
              }
            >
              <div className="hanzi">{el.hanzi}</div>
              <div className="frequency">{el.frequency}</div>
            </StyledVocabularyCard>
          ))}
      </StyledVocabulary>
    </StyledActions>
  );
}
