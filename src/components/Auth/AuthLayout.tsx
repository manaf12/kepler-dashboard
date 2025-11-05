import * as React from "react"

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#29323C" }}>
            <div className="w-full max-w-md p-8 rounded-2xl" style={{ backgroundColor: "#242730" }}>
                {children}
            </div>
        </div>
    )
}
