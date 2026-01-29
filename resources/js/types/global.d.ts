import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
    var Ziggy: ZiggyConfig;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: 'admin' | 'montador' | 'marcenaria' | 'lojista';
    status: 'active' | 'pending' | 'blocked';
    phone?: string;
    city?: string;
    state?: string;
    bio?: string;
    company_name?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: ZiggyConfig & { location: string };
};
