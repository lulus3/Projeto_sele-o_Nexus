import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const validateToken = async (token: string) => {
    try {
        const response = await fetch('http://localhost:8081/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        if (response.ok) {
            const userDetails = await response.json();
            console.log("sucesso ao validar token");
            return { isValid: true, userDetails };
        } else {
            console.log("erro ao validar token");
            return { isValid: false };
        }
    } catch (error) {
        console.error('Erro ao validar token:', error);
        return { isValid: false };
    }
};

interface IProps {
    children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("token está vazio");
            setIsAuthenticated(false);
            return;
        }

        const checkToken = async () => {
            const { isValid } = await validateToken(token);
            setIsAuthenticated(isValid);
            if (!isValid) {
                setHasError(true);
            }
        };

        checkToken();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // ou qualquer carregador enquanto verifica a autenticação
    }

    if (hasError) {
        return <Navigate to="/login" />;
    }

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

