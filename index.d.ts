declare module "smpp" {
	import type { EventEmitter } from "events";
	import type { Socket } from "net";
	import type { TLSSocket } from "tls";
	import type { Buffer } from "node:buffer";

	export interface Type {
		read(buffer: Buffer, offset: number): any;
		write(value: any, buffer: Buffer, offset: number): void;
		size(value?: any): number;
		default: any;
	}

	export interface Types {
		int8: Type;
		int16: Type;
		int32: Type;
		string: Type;
		cstring: Type;
		buffer: Type;
		dest_address_array: Type;
		unsuccess_sme_array: Type;
		tlv: {
			int8: Type;
			int16: Type;
			int32: Type;
			cstring: Type;
			string: Type;
			buffer: Type;
		};
	}

	export interface GSMCoder {
		chars: string;
		extChars: string;
		escChars: string;
		charRegex: RegExp;
		charListEnc: Record<string, number>;
		extCharListEnc: Record<string, string>;
		charListDec: Record<number, string>;
		extCharListDec: Record<string, string>;
	}

	export interface GSMCoders {
		GSM: GSMCoder;
		GSM_TR: GSMCoder;
		GSM_ES: GSMCoder;
		GSM_PT: GSMCoder;
		getCoder(encoding: number): GSMCoder;
		encode(string: string, encoding: number): Buffer;
		decode(string: Buffer, encoding: number): string;
		detect(string: string): number | undefined;
	}

	export interface Encoding {
		match(value: string): boolean;
		encode(value: string): Buffer;
		decode(value: Buffer): string;
	}

	export interface Encodings {
		ASCII: Encoding;
		LATIN1: Encoding;
		UCS2: Encoding;
		detect(value: string): string | false;
		default: string;
	}

	export interface Filter {
		encode(value: any): any;
		decode(value: any): any;
	}

	export interface Filters {
		time: Filter;
		message: Filter;
		billing_identification: Filter;
		broadcast_area_identifier: Filter;
		broadcast_content_type: Filter;
		broadcast_frequency_interval: Filter;
		callback_num: Filter;
		callback_num_atag: Filter;
	}

	export interface TLV {
		id: number;
		type: Type;
		filter?: Filter;
		multiple?: boolean;
	}

	export interface TLVs {
		[key: string]: TLV;
	}

	export interface Command {
		id: number;
		params: Record<string, { type: Type; default?: any }>;
		tlvMap?: Record<string, string>;
	}

	export interface Commands {
		[key: string]: Command;
	}

	export interface Consts {
		REGISTERED_DELIVERY: Record<string, number>;
		ESM_CLASS: Record<string, number>;
		MESSAGE_STATE: Record<string, number>;
		TON: Record<string, number>;
		NPI: Record<string, number>;
		ENCODING: Record<string, number>;
		NETWORK: Record<string, number>;
		BROADCAST_AREA_FORMAT: Record<string, number>;
		BROADCAST_FREQUENCY_INTERVAL: Record<string, number>;
	}

	export interface Errors {
		ESME_ROK: number;
		ESME_RINVMSGLEN: number;
		ESME_RINVCMDLEN: number;
		ESME_RINVCMDID: number;
		ESME_RINVBNDSTS: number;
		ESME_RALYBND: number;
		ESME_RINVPRTFLG: number;
		ESME_RINVREGDLVFLG: number;
		ESME_RSYSERR: number;
		ESME_RINVSRCADR: number;
		ESME_RINVDSTADR: number;
		ESME_RINVMSGID: number;
		ESME_RBINDFAIL: number;
		ESME_RINVPASWD: number;
		ESME_RINVSYSID: number;
		ESME_RCANCELFAIL: number;
		ESME_RREPLACEFAIL: number;
		ESME_RMSGQFUL: number;
		ESME_RINVSERTYP: number;
		ESME_RINVNUMDESTS: number;
		ESME_RINVDLNAME: number;
		ESME_RINVDESTFLAG: number;
		ESME_RINVSUBREP: number;
		ESME_RINVESMCLASS: number;
		ESME_RCNTSUBDL: number;
		ESME_RSUBMITFAIL: number;
		ESME_RINVSRCTON: number;
		ESME_RINVSRCNPI: number;
		ESME_RINVDSTTON: number;
		ESME_RINVDSTNPI: number;
		ESME_RINVSYSTYP: number;
		ESME_RINVREPFLAG: number;
		ESME_RINVNUMMSGS: number;
		ESME_RTHROTTLED: number;
		ESME_RINVSCHED: number;
		ESME_RINVEXPIRY: number;
		ESME_RINVDFTMSGID: number;
		ESME_RX_T_APPN: number;
		ESME_RX_P_APPN: number;
		ESME_RX_R_APPN: number;
		ESME_RQUERYFAIL: number;
		ESME_RINVTLVSTREAM: number;
		ESME_RTLVNOTALLWD: number;
		ESME_RINVTLVLEN: number;
		ESME_RMISSINGTLV: number;
		ESME_RINVTLVVAL: number;
		ESME_RDELIVERYFAILURE: number;
		ESME_RUNKNOWNERR: number;
		ESME_RSERTYPUNAUTH: number;
		ESME_RPROHIBITED: number;
		ESME_RSERTYPUNAVAIL: number;
		ESME_RSERTYPDENIED: number;
		ESME_RINVDCS: number;
		ESME_RINVSRCADDRSUBUNIT: number;
		ESME_RINVDSTADDRSUBUNIT: number;
		ESME_RINVBCASTFREQINT: number;
		ESME_RINVBCASTALIAS_NAME: number;
		ESME_RINVBCASTAREAFMT: number;
		ESME_RINVNUMBCAST_AREAS: number;
		ESME_RINVBCASTCNTTYPE: number;
		ESME_RINVBCASTMSGCLASS: number;
		ESME_RBCASTFAIL: number;
		ESME_RBCASTQUERYFAIL: number;
		ESME_RBCASTCANCELFAIL: number;
		ESME_RINVBCAST_REP: number;
		ESME_RINVBCASTSRVGRP: number;
		ESME_RINVBCASTCHANIND: number;
	}

	export const types: Types;
	export const gsmCoder: GSMCoders;
	export const encodings: Encodings;
	export const filters: Filters;
	export const tlvs: TLVs;
	export const tlvsById: Record<number, TLV>;
	export const commands: Commands;
	export const commandsById: Record<number, Command>;
	export const consts: Consts;
	export const errors: Errors;

	export interface SMPPOptions {
		url?: string;
		host?: string;
		port?: number;
		tls?: boolean;
		socket?: Socket | TLSSocket;
		connectTimeout?: number;
		auto_enquire_link_period?: number;
		debug?: boolean;
		debugListener?: (type: string, msg: string, payload: any) => void;
		rejectUnauthorized?: boolean;
	}

	export interface PDUOptions {
		command_status?: number;
		sequence_number?: number;
		[key: string]: any;
	}

	export class PDU {
		command: string;
		command_length: number;
		command_id: number;
		command_status: number;
		sequence_number: number;

		constructor(command: string | Buffer, options?: PDUOptions);

		static commandLength(stream: NodeJS.ReadableStream): number | false;
		static fromStream(
			stream: NodeJS.ReadableStream,
			command_length: number
		): PDU | false;
		static fromBuffer(buffer: Buffer): PDU | false;

		isResponse(): boolean;
		response(options?: PDUOptions): PDU;

		fromBuffer(buffer: Buffer): void;
		_filter(func: "encode" | "decode"): void;
		_initBuffer(): Buffer;
		toBuffer(): Buffer;

		static maxLength: number;
	}

	export class Session extends EventEmitter {
		options: SMPPOptions;
		socket: Socket | TLSSocket;
		remoteAddress: string;
		remotePort: number;
		_id: string;
		_mode: string;
		_interval: NodeJS.Timeout | null;

		constructor(options: SMPPOptions);
		connect(): void;
		send(
			pdu: PDU,
			responseCallback?: (pdu: PDU) => void,
			sendCallback?: (pdu: PDU) => void,
			failureCallback?: (pdu: PDU, err?: Error) => void
		): boolean;
		pause(): void;
		resume(): void;
		close(callback?: () => void): void;
		destroy(callback?: () => void): void;
		enquire_link(
			options?: PDUOptions,
			responseCallback?: (pdu: PDU) => void,
			sendCallback?: (pdu: PDU) => void,
			failureCallback?: (pdu: PDU, err?: Error) => void
		): boolean;
		bind_transceiver(
			options: PDUOptions,
			responseCallback?: (pdu: PDU) => void,
			sendCallback?: (pdu: PDU) => void,
			failureCallback?: (pdu: PDU, err?: Error) => void
		): boolean;
		submit_sm(
			options: PDUOptions,
			responseCallback?: (pdu: PDU) => void,
			sendCallback?: (pdu: PDU) => void,
			failureCallback?: (pdu: PDU, err?: Error) => void
		): boolean;

		on(event: "error", listener: (err: Error) => void): this;
		on(event: "bind_transceiver", listener: (pdu: PDU) => void): this;
		on(event: "enquire_link", listener: (pdu: PDU) => void): this;
		on(event: "submit_sm", listener: (pdu: PDU) => void): this;
		on(event: "pdu", listener: (pdu: PDU) => void): this;
		// Add other command methods as needed
	}

	export interface ServerOptions {
		key?: string;
		cert?: string;
		enable_proxy_protocol_detection?: boolean;
		debug?: boolean;
		debugListener?: (type: string, msg: string, payload: any) => void;
		autoPrependBuffer?: Buffer;
	}

	export class Server extends EventEmitter {
		constructor(options: ServerOptions, listener?: (session: Session) => void);
		listen(port?: number, host?: string, callback?: () => void): this;
		close(callback?: (err?: Error) => void): this;
		address(): { port: number; family: string; address: string } | string;
		getConnections(cb: (error: Error | null, count: number) => void): void;
		ref(): this;
		unref(): this;
	}

	export function createServer(
		options: ServerOptions,
		listener?: (session: Session) => void
	): Server;

	export function connect(
		options: SMPPOptions,
		listener?: (session: Session) => void
	): Session;

	export function addCommand(command: string, options: any): void;
	export function addTLV(tag: string, options: any): void;
}
