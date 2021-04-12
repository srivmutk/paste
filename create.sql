--- Language Table, language column set to unique, as to use it as a foreign key in the pastes table
CREATE TABLE IF NOT EXISTS languages (
    id SERIAL PRIMARY KEY NOT NULL,
    language varchar(255) NOT NULL UNIQUE,
    name varchar(255) NOT NULL 
); 

--- No Duplicates allowed in language column, 
--- Language column and Name column from https://prismjs.com/plugins/show-language/ for use in syntax highlighting
INSERT INTO languages
    ( language, name ) 
VALUES
    ('none', 'Plaintext'),
    ('go', 'Golang'),
    ('python', 'Python'),
    ('md', 'Markdown'),
    ('mongodb', 'MongoDB'),
    ('elixir', 'Elixir'),
    ('java', 'Java'),
    ('kotlin', 'Kotlin'),
    ('js', 'JavaScript'),
    ('jsx', 'React JSX'),
    ('ts', 'TypeScript'),
    ('tsx', 'React TSX'),
    ('tsconfig', 'TSConfig'),
    ('r', 'R'),
    ('rb', 'Ruby'),
    ('rust', 'Rust'),
    ('sql', 'SQL'),
    ('sol', 'Solidity (Ethereum)'),
    ('lua', 'Lua'),
    ('html', 'HTML'),
    ('css', 'CSS'),
    ('csharp', 'C#'),
    ('haskell', 'Haskell'),
    ('swift', 'Swift'),
    ('scala', 'Scala'),
    ('svg', 'SVG'),
    ('graphql', 'GraphQL'),
    ('php', 'PHP'),
    ('powershell', 'PowerShell'),
    ('yaml', 'YAML'),
    ('zig', 'Zig'),
    ('json', 'JSON')
ON CONFLICT (language)
DO NOTHING;

--- Pastes Table
    --- id bigint for use with snowflake
    --- expiry dates cannot be in the past
    --- language is a foreign key refrencing language column in languages table
CREATE TABLE IF NOT EXISTS pastes (
    id BIGINT PRIMARY KEY NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
    expires_at TIMESTAMP WITH TIME ZONE CONSTRAINT positive_date CHECK (expires_at > created_at),   
    language VARCHAR(255),
    CONSTRAINT fk_languages FOREIGN KEY (language)
        REFERENCES languages(language)
);

--- Paste View
    --- Get language id for use with Prismjs syntax highlighting, and get the language's display name
    --- If expiry date is in the future, is_valid = true
    --- If expiry date has not been set, is_valid = true
    --- For any other cases, is_valid = false
CREATE OR REPLACE VIEW vw_pastes AS SELECT 
    paste.id,
    paste.title,
    paste.text,
    paste.created_at,
    paste.expires_at,
    paste.language,
    language.name,  
    (CASE 
        WHEN paste.expires_at > NOW() THEN true 
        WHEN paste.expires_at IS NULL THEN true
        ELSE false END
    ) AS is_valid
FROM PASTES paste 
INNER JOIN languages language
ON paste.language = language.language;

--- Indices
CREATE INDEX IF NOT EXISTS expiry_date ON pastes(expires_at); 
CREATE INDEX IF NOT EXISTS language_id ON languages(language);





