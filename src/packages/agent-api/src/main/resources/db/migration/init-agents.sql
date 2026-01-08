-- Create agents table if it doesn't exist
CREATE TABLE IF NOT EXISTS agents (
    id BIGSERIAL PRIMARY KEY,
    branch VARCHAR(3) NOT NULL,
    agent_code VARCHAR(20) NOT NULL UNIQUE,
    company_name VARCHAR(255) NOT NULL,
    company_name_local VARCHAR(255),
    short_name VARCHAR(255) NOT NULL,
    agent_type VARCHAR(255) NOT NULL,
    agent_status VARCHAR(255) NOT NULL
);

-- Initialize agents table with data
DELETE FROM agents;

INSERT INTO agents (branch, agent_code, company_name, company_name_local, short_name, agent_type, agent_status) VALUES ('VEY', '00000116700', 'Agent 00003700', 'Agent Ltd', 'EHQ', 'FVN', 'Rejected');
INSERT INTO agents (branch, agent_code, company_name, company_name_local, short_name, agent_type, agent_status) VALUES ('YOU', '00000220600', 'Agent 00007600', NULL, 'VQP', 'BAI', 'Active');

