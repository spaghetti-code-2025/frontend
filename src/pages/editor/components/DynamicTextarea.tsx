import React, { useEffect, useRef, useState } from "react";

interface DynamicTextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
}

const DynamicTextarea = ({
  placeholder = "Type something...",
  value = "",
  onChange,
  className = "",
  onFocus,
  onBlur,
  disabled,
}: DynamicTextareaProps) => {
  const [text, setText] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(value || "");
  }, [value]);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to recalculate based on content
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      className={`resize-none overflow-hidden w-full rounded focus:outline-none ${className}`}
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
      rows={1} // Start with a single row
      style={{ lineHeight: "1.5" }}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
    />
  );
};

export default DynamicTextarea;
