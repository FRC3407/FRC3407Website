import { Units } from "types/calendar"

export function makeNiceUnit(unit: string, defaultUnit: Units = "day") {
    switch (unit.toLowerCase()) {
      case "d": return "day"
      case "day": return "day"
      case "w": return "week"
      case "week": return "week"
      case "m": return "month"
      case "month": return "month"
      default: return defaultUnit
    }
  }