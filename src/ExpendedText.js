import React, { useState } from "react";

export default function ExpendedText() {
  return (
    <>
      <Expendable>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Expendable>
      <Expendable>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Expendable>
      <Expendable collapseword="40" expendDefault={false}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Expendable>
    </>
  );
}

function Expendable({
  children,
  collapseword = 10,
  showMoreButtontext = "Show More",
  ShowLessButtontext = "Show Less",
  expendDefault = true,
}) {
  const [expend, setExpend] = useState(expendDefault);

  const displayText = expend
    ? children.split(" ").slice(0, collapseword).join(" ") + "..."
    : children;
  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col-12">{displayText}</div>
          <button onClick={() => setExpend((exp) => !exp)}>
            {expend ? showMoreButtontext : ShowLessButtontext}
          </button>
          <br></br>
        </div>
      </div>
    </>
  );
}
