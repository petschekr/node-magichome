type Pattern =
	"seven_color_cross_fade" |
	"red_gradual_change" |
	"green_gradual_change" |
	"blue_gradual_change" |
	"yellow_gradual_change" |
	"cyan_gradual_change" |
	"purple_gradual_change" |
	"white_gradual_change" |
	"red_green_cross_fade" |
	"red_blue_cross_fade" |
	"green_blue_cross_fade" |
	"seven_color_strobe_flash" |
	"red_strobe_flash" |
	"green_strobe_flash" |
	"blue_stobe_flash" |
	"yellow_strobe_flash" |
	"cyan_strobe_flash" |
	"purple_strobe_flash" |
	"white_strobe_flash" |
	"seven_color_jumping";

export class Control {
	constructor(address: string, characteristics?: Partial<{
		rgb_min_0: boolean,
		ww_min_0: boolean,
		wait_for_reply: boolean,
		set_color_magic_bytes: [number, number]
	}>);

	turnOn(): Promise<boolean>;
	turnOff(): Promise<boolean>;

	setColor(red: number, green: number, blue: number): Promise<boolean>;
	setColorWithBrightness(red: number, green: number, blue: number, brightness: number): Promise<boolean>;

	setPattern<T>(pattern: Pattern, speed: number): Promise<boolean>;

	queryState(): Promise<{
		on: boolean;
		mode: "color" | "warm_white" | "custom" | "special" | Pattern;
		speed: number;
		color: {
			red: number;
			green: number;
			blue: number;
		};
		warm_white_percent: number;
	}>;

	startEffectMode(callback: (effectInterface: EffectInterface) => void): void;
}

interface EffectInterface {
	start(intervalFunction: () => void): void;
	setColor(red: number, green: number, blue: number): void;
	delay(milliseconds: number): void;
	stop(): void;
}

interface Device {
	address: string;
	id: string;
	model: string;
}

export class Discovery {
	constructor();

	scan(timeout: number, callback?: (err: Error | null, devices: Device[]) => any): Promise<Device[]>;
}
