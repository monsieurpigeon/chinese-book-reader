import { useState } from "react";
import styled from "styled-components";
import Papa from "papaparse";

const StyledModal = styled.dialog`
  border-radius: 5px;
  background-color: #242424;
  border: 1px solid #696969;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  .message {
    font-size: 1.3em;
    width: 200px;
    span {
      font-weight: bold;
    }
  }
  .actions {
    display: flex;
    align-self: flex-end;
    gap: 10px;
    justify-content: end;
    .confirm {
      background-color: #696969;
    }
  }
`;

interface SyncHCModalProps {
  onClose: () => void;
  onAddWords: (words: IKnownWords[]) => void;
}

interface IKnownWords {
  Simplified: string;
}

export function SyncHCModal({ onAddWords, onClose }: SyncHCModalProps) {
  const [knownWords, setKnownWords] = useState<IKnownWords[]>();

  const changeHandler = (event: any) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setKnownWords(results.data as unknown as IKnownWords[]);
      },
    });
  };

  return (
    <StyledModal open>
      <div>
        <div>
          Sync your{" "}
          <a
            href="https://www.hackchinese.com/?r=ee7f43"
            target="_blank"
            rel="noreferrer"
          >
            Hack Chinese
          </a>{" "}
          known words
        </div>
      </div>
      <div>
        <input type="file" accept=".csv" onChange={changeHandler} />
      </div>
      <div>
        {knownWords && knownWords?.length > 0 && (
          <div className="message">
            Add <span>{knownWords?.length}</span> known words to your list ?
          </div>
        )}
      </div>
      <div className="actions">
        <button onClick={onClose}>Cancel</button>
        {knownWords && knownWords?.length > 0 && (
          <button
            className="confirm"
            onClick={() => {
              onAddWords(knownWords);
              onClose();
            }}
          >
            Confirm
          </button>
        )}
      </div>
    </StyledModal>
  );
}
