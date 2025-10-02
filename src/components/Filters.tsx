import { useState } from "react";

export interface FilterConfig {
  name: string;
  label: string;
  type: "text" | "select";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface FiltersProps {
  configs: FilterConfig[];
  onApply: (filters: Record<string, string>) => void;
}

export default function Filters({ configs, onApply }: FiltersProps) {
  const initialFilters = configs.reduce((acc, config) => {
    acc[config.name] = "";
    return acc;
  }, {} as Record<string, string>);

  const [filters, setFilters] =
    useState<Record<string, string>>(initialFilters);

  const handleChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    // Only send non-empty filters
    const activeFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    onApply(activeFilters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onApply({});
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="filters">
      <div className="filters-grid">
        {configs.map((config) => (
          <div key={config.name} className="filter-field">
            <label htmlFor={config.name} className="filter-label">
              {config.label}
            </label>

            {config.type === "text" ? (
              <input
                id={config.name}
                type="text"
                placeholder={config.placeholder || config.label}
                value={filters[config.name]}
                onChange={(e) => handleChange(config.name, e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApply()}
              />
            ) : (
              <select
                id={config.name}
                value={filters[config.name]}
                onChange={(e) => handleChange(config.name, e.target.value)}
              >
                <option value="">{`Select ${config.label}`}</option>
                {config.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      <div className="filters-actions">
        {hasActiveFilters && (
          <button className="btn btn-reset" onClick={handleReset}>
            Reset
          </button>
        )}
        <button className="btn btn-apply" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
}
