import { cn } from "@/lib/utils";
import { useId } from "react";

const InputGroup = ({
  className = "",
  label = "",
  type = "text",
  name = "",
  placeholder = "",
  required = false,
  disabled = false,
  value,
  defaultValue,
  error,
  handleChange,
  active,
  icon,
  iconPosition = "right",
  height = "md",
  fileStyleVariant,
}) => {
  const id = useId();

  return (
    <div className={cn("mb-4", className)}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-dark dark:text-white"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div
        className={cn(
          "relative",
          icon && "flex items-center",
          iconPosition === "left" && "flex-row-reverse",
        )}
      >
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          data-active={active}
          className={cn(
            "w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm text-dark outline-none transition placeholder:text-dark-6 focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:placeholder:text-dark-6 dark:focus:border-primary dark:disabled:bg-dark",
            icon && iconPosition === "left" && "pl-12",
            icon && iconPosition === "right" && "pr-12",
            height === "sm" && "py-2.5",
            type === "file" && getFileStyles(fileStyleVariant),
            error && "border-red-500 focus:border-red-500",
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        {icon && (
          <span
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-dark-4 dark:text-dark-5",
              iconPosition === "left" ? "left-4" : "right-4",
            )}
          >
            {icon}
          </span>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputGroup;

function getFileStyles(variant) {
  switch (variant) {
    case "style1":
      return `file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white`;
    default:
      return `file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 file:focus:border-primary dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white px-3 py-[9px]`;
  }
}
