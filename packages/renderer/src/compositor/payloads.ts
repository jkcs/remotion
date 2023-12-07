// Must keep this file synced with payloads.rs!
export type Layer =
	| {
			type: 'PngImage';
			params: {
				src: string;
				x: number;
				y: number;
				width: number;
				height: number;
			};
	  }
	| {
			type: 'JpgImage';
			params: {
				src: string;
				x: number;
				y: number;
				width: number;
				height: number;
			};
	  }
	| {
			type: 'Solid';
			params: {
				fill: [number, number, number, number];
				x: number;
				y: number;
				width: number;
				height: number;
			};
	  };

export type CompositorImageFormat = 'Png' | 'Jpeg';

export type VideoMetadata = {
	fps: number;
	width: number;
	height: number;
	durationInSeconds: number;
	codec: 'h264' | 'h265' | 'vp8' | 'vp9' | 'av1' | 'prores' | 'unknown';
	canPlayInVideoTag: boolean;
	supportsSeeking: boolean;
	colorSpace:
		| 'rgb'
		| 'bt601'
		| 'bt709'
		| 'bt2020-ncl'
		| 'bt2020-cl'
		| 'fcc'
		| 'bt470bg'
		| 'smpte170m'
		| 'smpte240m'
		| 'ycgco'
		| 'smpte2085'
		| 'chroma-derived-ncl'
		| 'chroma-derived-cl'
		| 'ictcp'
		| 'unknown';
	audioCodec:
		| null
		| 'opus'
		| 'aac'
		| 'mp3'
		| 'pcm-f16le'
		| 'pcm-f24le'
		| 'pcm-f32be'
		| 'pcm-s16be'
		| 'pcm-s16le'
		| 'pcm-f32le'
		| 'pcm-s32be'
		| 'pcm-s32le'
		| 'pcm-s64be'
		| 'pcm-s64le'
		| 'pcm-u16be'
		| 'pcm-u16le'
		| 'pcm-u24be'
		| 'pcm-u24le'
		| 'pcm-u32be'
		| 'pcm-u32le'
		| 'pcm-u8'
		| 'pcm-f64be'
		| 'pcm-s24be'
		| 'pcm-s24le'
		| 'pcm-s8'
		| 'pcm-s16be-planar'
		| 'pcm-s8-planar'
		| 'pcm-s24le-planar'
		| 'pcm-s32le-planar'
		| 'unknown';
	audioFileExtension: string | null;
	pixelFormat:
		| null
		| 'unknown'
		| 'yuv420p'
		| 'yuyv422'
		| 'rgb24'
		| 'bgr24'
		| 'yuv422p'
		| 'yuv444p'
		| 'yuv410p'
		| 'yuv411p'
		| 'gray8'
		| 'monowhite'
		| 'monoblack'
		| 'pal8'
		| 'yuvj420p'
		| 'yuvj422p'
		| 'yuvj444p'
		| 'uyvy422'
		| 'uyyvyy411'
		| 'bgr8'
		| 'bgr4'
		| 'bgr4_byte'
		| 'rgb8'
		| 'rgb4'
		| 'rgb4_byte'
		| 'nv12'
		| 'nv21'
		| 'argb'
		| 'rgba'
		| 'abgr'
		| 'bgra'
		| 'gray16be'
		| 'gray16le'
		| 'yuv440p'
		| 'yuvj440p'
		| 'yuva420p'
		| 'rgb48be'
		| 'rgb48le'
		| 'rgb565be'
		| 'rgb565le'
		| 'rgb555be'
		| 'rgb555le'
		| 'bgr565be'
		| 'bgr565le'
		| 'bgr555be'
		| 'bgr555le'
		| 'vaapi'
		| 'yuv420p16le'
		| 'yuv420p16be'
		| 'yuv422p16le'
		| 'yuv422p16be'
		| 'yuv444p16le'
		| 'yuv444p16be'
		| 'dxva2_vld'
		| 'rgb444le'
		| 'rgb444be'
		| 'bgr444le'
		| 'bgr444be'
		| 'ya8'
		| 'bgr48be'
		| 'bgr48le'
		| 'yuv420p9be'
		| 'yuv420p9le'
		| 'yuv420p10be'
		| 'yuv420p10le'
		| 'yuv422p10be'
		| 'yuv422p10le'
		| 'yuv444p9be'
		| 'yuv444p9le'
		| 'yuv444p10be'
		| 'yuv444p10le'
		| 'yuv422p9be'
		| 'yuv422p9le'
		| 'gbrp'
		| 'gbrp9be'
		| 'gbrp9le'
		| 'gbrp10be'
		| 'gbrp10le'
		| 'gbrp16be'
		| 'gbrp16le'
		| 'yuva420p9be'
		| 'yuva420p9le'
		| 'yuva422p9be'
		| 'yuva422p9le'
		| 'yuva444p9be'
		| 'yuva444p9le'
		| 'yuva420p10be'
		| 'yuva420p10le'
		| 'yuva422p10be'
		| 'yuva422p10le'
		| 'yuva444p10be'
		| 'yuva444p10le'
		| 'yuva420p16be'
		| 'yuva420p16le'
		| 'yuva422p16be'
		| 'yuva422p16le'
		| 'yuva444p16be'
		| 'yuva444p16le'
		| 'vdpau'
		| 'xyz12le'
		| 'xyz12be'
		| 'nv16'
		| 'nv20le'
		| 'nv20be'
		| 'rgba64be'
		| 'rgba64le'
		| 'bgra64be'
		| 'bgra64le'
		| 'yvyu422'
		| 'ya16be'
		| 'ya16le'
		| 'qsv'
		| 'mmal'
		| 'd3d11va_vld'
		| 'cuda'
		| 'zrgb'
		| 'rgbz'
		| 'zbgr'
		| 'bgrz'
		| 'yuva444p'
		| 'yuva422p'
		| 'yuv420p12be'
		| 'yuv420p12le'
		| 'yuv420p14be'
		| 'yuv420p14le'
		| 'yuv422p12be'
		| 'yuv422p12le'
		| 'yuv422p14be'
		| 'yuv422p14le'
		| 'yuv444p12be'
		| 'yuv444p12le'
		| 'yuv444p14be'
		| 'yuv444p14le'
		| 'gbrp12be'
		| 'gbrp12le'
		| 'gbrp14be'
		| 'gbrp14le'
		| 'gbrap'
		| 'gbrap16be'
		| 'gbrap16le'
		| 'yuvj411p'
		| 'bayer_bggr8'
		| 'bayer_rggb8'
		| 'bayer_gbrg8'
		| 'bayer_grbg8'
		| 'bayer_bggr16le'
		| 'bayer_bggr16be'
		| 'bayer_rggb16le'
		| 'bayer_rggb16be'
		| 'bayer_gbrg16le'
		| 'bayer_gbrg16be'
		| 'bayer_grbg16le'
		| 'bayer_grbg16be'
		| 'yuv440p10le'
		| 'yuv440p10be'
		| 'yuv440p12le'
		| 'yuv440p12be'
		| 'ayuv64le'
		| 'ayuv64be'
		| 'videotoolbox'
		| 'xvmc'
		| 'rgb32'
		| 'rgb32_1'
		| 'bgr32'
		| 'bgr32_1'
		| 'zrgb32'
		| 'zbgr32'
		| 'gray16'
		| 'ya16'
		| 'rgb48'
		| 'rgb565'
		| 'rgb555'
		| 'rgb444'
		| 'bgr48'
		| 'bgr565'
		| 'bgr555'
		| 'bgr444'
		| 'yuv420p9'
		| 'yuv422p9'
		| 'yuv444p9'
		| 'yuv420p10'
		| 'yuv422p10'
		| 'yuv440p10'
		| 'yuv444p10'
		| 'yuv420p12'
		| 'yuv422p12'
		| 'yuv440p12'
		| 'yuv444p12'
		| 'yuv420p14'
		| 'yuv422p14'
		| 'yuv444p14'
		| 'yuv420p16'
		| 'yuv422p16'
		| 'yuv444p16'
		| 'gbrp9'
		| 'gbrp10'
		| 'gbrp12'
		| 'gbrp14'
		| 'gbrp16'
		| 'gbrap16'
		| 'bayer_bggr16'
		| 'bayer_rggb16'
		| 'bayer_gbrg16'
		| 'bayer_grbg16'
		| 'yuva420p9'
		| 'yuva422p9'
		| 'yuva444p9'
		| 'yuva420p10'
		| 'yuva422p10'
		| 'yuva444p10'
		| 'yuva420p16'
		| 'yuva422p16'
		| 'yuva444p16'
		| 'xyz12'
		| 'nv20'
		| 'ayuv64'
		| 'p010le'
		| 'p010be'
		| 'gbrap12be'
		| 'gbrap12le'
		| 'gbrap10le'
		| 'gbrap10be'
		| 'mediacodec'
		| 'gray12be'
		| 'gray12le'
		| 'gray10be'
		| 'gray10le'
		| 'p016le'
		| 'p016be'
		| 'd3d11'
		| 'gray9be'
		| 'gray9le'
		| 'gbrpf32be'
		| 'gbrpf32le'
		| 'gbrapf32be'
		| 'gbrapf32le'
		| 'drm_prime'
		| 'opencl'
		| 'gray14be'
		| 'gray14le'
		| 'grayf32be'
		| 'grayf32le'
		| 'yuva422p12be'
		| 'yuva422p12le'
		| 'yuva444p12be'
		| 'yuva444p12le'
		| 'nv24'
		| 'nv42'
		| 'vulkan'
		| 'y210be'
		| 'y210le'
		| 'x2rgb10le'
		| 'x2rgb10be'
		| 'x2bgr10le'
		| 'x2bgr10be'
		| 'p210be'
		| 'p210le'
		| 'p410be'
		| 'p410le'
		| 'p216be'
		| 'p216le'
		| 'p416be'
		| 'p416le'
		| 'vuya'
		| 'rgbaf16be'
		| 'rgbaf16le'
		| 'vuyx'
		| 'p012le'
		| 'p012be'
		| 'y212be'
		| 'y212le'
		| 'xv30be'
		| 'xv30le'
		| 'xv36be'
		| 'xv36le'
		| 'rgbf32be'
		| 'rgbf32le'
		| 'rgbaf32be'
		| 'rgbaf32le'
		| 'p212be'
		| 'p212le'
		| 'p412be'
		| 'p412le'
		| 'gbrap14be'
		| 'gbrap14le';
};

type SilentPart = {
	startInSeconds: number;
	endInSeconds: number;
};

export type SilentParts = SilentPart[];

export type GetSilentPartsResponseRust = {
	silentParts: SilentParts;
	durationInSeconds: number;
};

export type GetSilentPartsResponse = GetSilentPartsResponseRust & {
	audibleParts: SilentParts;
};

export type CompositorCommand = {
	Compose: {
		output: string;
		width: number;
		height: number;
		layers: Layer[];
		output_format: CompositorImageFormat;
	};
	ExtractFrame: {
		src: string;
		original_src: string;
		time: number;
		transparent: boolean;
	};
	GetSilences: {
		src: string;
		noiseThresholdInDecibels: number;
		minDurationInSeconds: number;
	};
	Echo: {
		message: string;
	};
	StartLongRunningProcess: {
		concurrency: number;
		maximum_frame_cache_size_in_bytes: number | null;
		verbose: boolean;
	};
	CopyImageToClipboard: {
		src: string;
	};
	GetOpenVideoStats: {};
	DeliberatePanic: {};
	CloseAllVideos: {};
	FreeUpMemory: {
		remaining_bytes: number;
	};
	GetVideoMetadata: {src: string};
	ExtractAudio: {input_path: string; output_path: string};
	VideoMetadata: VideoMetadata;
};

export type CompositorCommandSerialized<T extends keyof CompositorCommand> = {
	nonce: string;
	payload: {
		type: T;
		params: CompositorCommand[T];
	};
};

export type ErrorPayload = {
	error: string;
	backtrace: string;
};
