/* tslint:disable */
import * as dotenv from "dotenv";
import * as express from "express";
import * as jwt from 'jsonwebtoken';
import { AuthError } from "@efficacy/exceptions";
import { RedisClient } from "./config/redis-config";

dotenv.config();

const { SECRET_KEY, TOKEN_ISSUER } =
    process.env;

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    const token: string = request.headers.authorization || '';
    return new Promise((resolve, reject) => {
        if (!token) {
            reject(new AuthError(
                "Authentication Error",
                401,
                "Authorization header is missing."));
        }

        jwt.verify(token, SECRET_KEY || '', (err: any, decoded: any) => {
            // console.log(err, decoded)
            if (err) {
                reject(new AuthError(
                    "Authentication Error",
                    401,
                    err));
            } else {
                RedisClient.getInstance().getClient().get(decoded.sessionId).then((value: any) => {
                    if (value != token) {
                        reject(new AuthError(
                            "Authentication Error",
                            401,
                            "Invalid token."));
                    }
                    if (scopes && scopes.length > 0) {
                        for (const s of scopes) {
                            if (s == 'admin' && !decoded.adminAccess) {
                                reject(new AuthError(
                                    "User Permission Error",
                                    403,
                                    "You are not authorized to perform this operation."));
                            }
                            if (s == 'portal' && !decoded.portalAccess) {
                                reject(new AuthError(
                                    "User Permission Error",
                                    403,
                                    "You are not authorized to perform this operation."));
                            }
                            if (s == 'app' && !decoded.appAccess) {
                                reject(new AuthError(
                                    "User Permission Error",
                                    403,
                                    "You are not authorized to perform this operation."));
                            }
                        }
                    }
                    if (decoded.iss != TOKEN_ISSUER) {
                        reject(new AuthError(
                            "Authentication Error",
                            401,
                            "Invalid token."));
                    }
                    resolve(decoded);
                }).catch(() => {
                    reject(new AuthError(
                        "Invalid token",
                        401,
                        "Invalid user token"));
                });
            }
        });
    });
}