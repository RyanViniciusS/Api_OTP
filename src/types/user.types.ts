export type CreateUserResponse = {
    sucess: boolean;
    message: string;
    usuario?: {
        nome: string;
        email: string;
        avatar?: string | null;
    };
};