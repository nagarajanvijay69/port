export function Logo() {
    const SvgLogo = () => (
        <svg
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
        >
            <circle cx="128" cy="128" r="128" className="fill-primary" />
            <path
                d="M128 32C74.909 32 32 74.909 32 128C32 181.091 74.909 224 128 224C164.322 224 195.993 205.513 212.448 179H184.552C171.493 192.487 151.139 200 128 200C89.396 200 56 166.604 56 128C56 89.396 89.396 56 128 56C166.604 56 200 89.396 200 128V152L224 128L200 104V128C200 74.909 167.091 32 128 32Z"
                className="fill-primary-foreground"
            />
        </svg>
    );

    return (
        <div className="flex items-center gap-2">
            <div className="h-8 w-8">
                <SvgLogo />
            </div>
            <h1 className="text-2xl font-bold tracking-wider">
                Port
            </h1>
        </div>
    );
}
