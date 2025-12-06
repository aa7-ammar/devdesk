import { NextResponse } from "next/server";

export function success(data: any, status = 200) {
  return NextResponse.json(
    { success: true, data },
    { status }
  );
}

export function failure(
  message: string,
  status = 500,
  code?: string
) {
  return NextResponse.json(
    { success: false, message, code },
    { status }
  );
}
