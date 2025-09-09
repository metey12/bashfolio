const typeDelay = 10;

const typeText = async (
  textLines,
  textColor = "text-green-400",
  isInitialMessage = false,
  setOutput,
  setIsTyping,
  currentInput = ""
) => {
  setIsTyping(true);
  if (!isInitialMessage) {
    setOutput((prev) => [
      ...prev,
      <div className="mb-2">
        <span className="text-purple-400">mete.wtf</span>:~$&nbsp;{currentInput}
      </div>,
    ]);
  }

  for (const line of textLines) {
    let typedLine = "";
    const newElement = <div className={textColor}></div>;
    setOutput((prev) => [...prev, newElement]);

    for (let i = 0; i < line.length; i++) {
      typedLine += line[i];
      setOutput((prev) => {
        const newOutput = [...prev];
        newOutput[newOutput.length - 1] = (
          <div className={textColor}>{typedLine}</div>
        );
        return newOutput;
      });
      await new Promise((resolve) => setTimeout(resolve, typeDelay));
    }
  }
  setIsTyping(false);
};

export default typeText;
