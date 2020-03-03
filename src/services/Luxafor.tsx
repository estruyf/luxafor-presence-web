import { Availability } from "../models";

export const DEFAULT_COLOR = "000000";
export const API_URL = "/api/setColor";

export default class Luxafor {

  public static async setColor(deviceId: string, presence: string): Promise<string> {
    let color: string = DEFAULT_COLOR;

    if (!deviceId || !presence) {
      return color;
    }
    
    switch(presence) {
      case Availability.Available:
      case Availability.AvailableIdle:
        color = "008000";
        break;
      case Availability.Away:
      case Availability.BeRightBack:
        color = "B2B200";
        break;
      case Availability.Busy:
      case Availability.BusyIdle:
      case Availability.DoNotDisturb:
        color = "990000";
        break;
      case Availability.Offline:
      case Availability.PresenceUnknown:
      default:
        color = DEFAULT_COLOR;
        break;
    }

    const body = {
      userId: deviceId,
      actionFields: {
        color: "custom",
        custom_color: color
      }
    };

    const data = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (data && data.ok) {
      return color;
    } else {
      return DEFAULT_COLOR;
    }
  }

  public static getDeviceSetting(name: string): string {
    if (localStorage) {
      return localStorage.getItem(`Luxafor:${name}`) || "";
    }
    return "";
  }

  public static setDeviceSetting(name: string, value: string): void {
    if (localStorage) {
      localStorage.setItem(`Luxafor:${name}`, value);
    }
  }
}