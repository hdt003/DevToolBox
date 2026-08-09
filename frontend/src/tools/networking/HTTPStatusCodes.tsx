import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

const STATUS_CODES = [
  { code: 200, text: 'OK', category: '2xx Success', desc: 'Standard successful HTTP response for GET, POST, or PUT requests.', example: '200 OK' },
  { code: 201, text: 'Created', category: '2xx Success', desc: 'Request succeeded and a new server resource was successfully created.', example: 'HTTP/1.1 201 Created' },
  { code: 204, text: 'No Content', category: '2xx Success', desc: 'Request succeeded, but server deliberately returns no message body.', example: 'DELETE /users/123 -> 204 No Content' },
  { code: 301, text: 'Moved Permanently', category: '3xx Redirection', desc: 'The requested resource has been assigned a new permanent URI.', example: '301 Moved Permanently -> Location: https://...' },
  { code: 302, text: 'Found / Temporary Redirect', category: '3xx Redirection', desc: 'The target URI resides temporarily under a different URI.', example: '302 Found' },
  { code: 400, text: 'Bad Request', category: '4xx Client Error', desc: 'Server cannot process request due to malformed syntax or invalid parameters.', example: '400 Bad Request: Invalid JSON payload' },
  { code: 401, text: 'Unauthorized', category: '4xx Client Error', desc: 'Authentication is required and has failed or not been provided.', example: '401 Unauthorized: Missing Bearer Token' },
  { code: 403, text: 'Forbidden', category: '4xx Client Error', desc: 'Client is authenticated but lacks required permissions/roles.', example: '403 Forbidden: Insufficient role permissions' },
  { code: 404, text: 'Not Found', category: '4xx Client Error', desc: 'Server cannot find the requested URL endpoint or resource.', example: '404 Not Found: /api/v1/unknown' },
  { code: 429, text: 'Too Many Requests', category: '4xx Client Error', desc: 'User has sent too many requests in a given amount of time (rate limited).', example: '429 Too Many Requests: Retry after 60s' },
  { code: 500, text: 'Internal Server Error', category: '5xx Server Error', desc: 'Server encountered an unexpected condition or unhandled exception.', example: '500 Internal Server Error' },
  { code: 502, text: 'Bad Gateway', category: '5xx Server Error', desc: 'Server acting as a gateway received invalid response from upstream server.', example: '502 Bad Gateway (Nginx / Proxy)' },
  { code: 503, text: 'Service Unavailable', category: '5xx Server Error', desc: 'Server is currently down for maintenance or overloaded.', example: '503 Service Unavailable' },
];

export const HTTPStatusCodes: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = STATUS_CODES.filter(
    (s) =>
      s.code.toString().includes(query) ||
      s.text.toLowerCase().includes(query.toLowerCase()) ||
      s.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          placeholder="Search status codes (e.g. 200, 404, Unauthorized, Rate Limit)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <div key={item.code} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl font-extrabold text-brand-600 dark:text-brand-400">{item.code}</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">{item.text}</span>
              </div>
              <Badge variant="outline">{item.category}</Badge>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">{item.desc}</p>
            <p className="font-mono text-[11px] text-slate-400 bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
              Example: {item.example}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HTTPStatusCodes;
