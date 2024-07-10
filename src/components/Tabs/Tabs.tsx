import { Trans } from "@lingui/macro";
import { FC, PropsWithChildren, ReactNode, useState } from "react";
import { colors } from "theme/colors";

const Tabs: FC<
  PropsWithChildren<{
    data?: Array<{ label?: string; content?: ReactNode }>;
    index?: number;
  }>
> = ({ data = [], index: propsIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(propsIndex);

  const handleSelect = (v = 0) => setCurrentIndex(v);

  return (
    <div style={{ paddingBottom: 48 }}>
      <div style={{ display: "flex", paddingLeft: 8 }}>
        {data.map((item, itemIndex) => {
          const isCurrent = itemIndex === currentIndex;

          return (
            <div
              style={{
                cursor: "pointer",
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 16,
                paddingBottom: 16,
                opacity: isCurrent ? 1 : 0.5,
                borderBottom: isCurrent
                  ? `solid ${colors.primary_dark} 2px`
                  : "solid transparent 2px",
                fontSize: 16,
                fontWeight: 500,
              }}
              onClick={() => handleSelect(itemIndex)}
              key={itemIndex}
            >
              <Trans>{item.label}</Trans>
            </div>
          );
        })}
      </div>
      <div>
        {data.map((item, itemIndex) => {
          const isCurrent = itemIndex === currentIndex;

          return <div key={itemIndex}>{isCurrent ? item?.content : null}</div>;
        })}
      </div>
    </div>
  );
};

export default Tabs;
