import styled from "styled-components";
import {
  PiEyeBold,
  PiEyeClosedBold,
  PiFolderNotchPlusBold,
  PiFolderSimpleDashedBold,
  PiInfoBold,
} from "react-icons/pi";
// TODO : import should not be raw but dsv plugin makes the build fail ATM
import csv from "../../../../assets/list.csv?raw";
import { useMemo, useState } from "react";
import { SyncHCModal } from "../../../../components/SyncHCModal";
import useLocalStorage from "../../../../utils/hooks/useLocalStorage";
import { COLORS, LOAD_KNOW_WORDS_KEY } from "../../../../utils/consts";

const wordsTxt = csv.split("\r\n");
const headers = wordsTxt.shift();
const words = wordsTxt.map((line) => {
  const parts = line.split(",");
  return headers?.split(",").reduce((memo, header, index) => {
    return { ...memo, [header]: parts[index] };
  }, {});
});

const StyledActions = styled.div`
  background-color: #333333;
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 5px;
  gap: 10px;
`;

const StyledActionBar = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 5px;
  height: 32px;
  padding-bottom: 0;
  .action-icon {
    opacity: 0.5;
  }

  .action-icon:hover {
    opacity: 1;
  }
`;

const StyledVocabulary = styled.div`
  overflow-y: auto;
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 8px;
  background-color: #242424;
  border: 5px solid #242424;

  .known {
    .hanzi {
      background-color: #333333;
      border: 1px solid ${COLORS.highlight};
    }
  }
`;

const StyledVocabularyCard = styled.div<{ $known: boolean }>`
  background-color: #333333;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid transparent;

  &.selected {
    border: 1px solid aqua;
    background-color: #454545;
    opacity: 0.8;
  }

  &:hover {
    .hanzi {
      border: 1px solid ${({ $known }) => ($known ? "white" : "aqua")};
      background-color: #333333;
    }
  }

  .hanzi {
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 5px 10px;
    background-color: #242424;
  }
`;

interface ActionProps {
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  memory: any;
  setMemory: React.Dispatch<React.SetStateAction<any>>;
}

export function ActionsSection({
  selected,
  setSelected,
  memory,
  setMemory,
}: ActionProps) {
  const [showKnown, setShowKnown] = useState(true);

  const knownWords = words.filter((el: any) => memory[el.hanzi], [memory]);

  const [openLoad, setOpenLoad] = useLocalStorage(LOAD_KNOW_WORDS_KEY, true);

  const selectedSize = useMemo(
    () => Object.values(selected).filter((v) => v).length,
    [selected]
  );

  return (
    <StyledActions>
      <StyledActionBar>
        <div
          className="clickable"
          title="import known words"
          onClick={() => setOpenLoad((v) => !v)}
        >
          <PiInfoBold className="action-icon" />
        </div>
        <div
          className="clickable"
          style={{
            color: selectedSize > 0 ? "aqua" : "inherit",
          }}
          title="copy selected words to clipboard"
          onClick={() => {
            const text = Object.keys(selected).join("\n");
            navigator.clipboard.writeText(text);
          }}
        >
          <PiFolderNotchPlusBold
            className="action-icon"
            style={{
              opacity: selectedSize > 0 ? 1 : 0.5,
            }}
          />
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
      <div
        style={{
          fontWeight: selectedSize > 0 ? "bold" : "inherit",
          color: selectedSize > 0 ? "aqua" : "inherit",
        }}
      >
        {selectedSize} selected
      </div>
      <div>
        {knownWords.length} / {words.length} known
      </div>
      {openLoad && (
        <SyncHCModal
          onClose={() => {
            setOpenLoad(false);
          }}
          onAddWords={(e) => {
            setMemory((v: any) => ({
              ...v,
              ...e.reduce(
                (memo, char) => ({ ...memo, [char.Simplified]: true }),
                {}
              ),
            }));
          }}
        />
      )}

      <StyledVocabulary className="hide-scroll">
        {words
          .filter((el: any) => {
            if (!showKnown) {
              return !memory[el.hanzi];
            } else {
              return true;
            }
          })
          .filter((el: any) => el?.hanzi !== " ")
          .map((el: any, index: number) => (
            <StyledVocabularyCard
              key={index}
              className={`clickable ${memory[el.hanzi] && "known"} ${
                selected[el.hanzi] && "selected"
              }`}
              $known={memory[el.hanzi]}
              onClick={() =>
                !memory[el.hanzi] &&
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
