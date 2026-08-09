import { describe, it, expect } from 'vitest';

describe('DevToolBox Utilities Test Suite', () => {
  
  // JSON Formatter Test
  it('formats JSON correctly', () => {
    const raw = '{"b":2,"a":1}';
    const parsed = JSON.parse(raw);
    const formatted = JSON.stringify(parsed, null, 2);
    expect(formatted).toContain('"b": 2');
    expect(formatted).toContain('"a": 1');
  });

  // Base64 Encoding & Decoding Test
  it('encodes and decodes Base64 UTF-8 string', () => {
    const str = 'Hello DevToolBox!';
    const encoded = btoa(str);
    const decoded = atob(encoded);
    expect(encoded).toBe('SGVsbG8gRGV2VG9vbEJveCE=');
    expect(decoded).toBe(str);
  });

  // URL Encoding Test
  it('encodes URI components', () => {
    const raw = 'https://devtoolbox.co/search?q=JSON Formatter';
    const encoded = encodeURIComponent(raw);
    expect(encoded).toContain('%3A%2F%2F');
  });

  // JWT Decoder Test
  it('decodes JWT token header and payload', () => {
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.sig';
    const parts = jwt.split('.');
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));

    expect(header.alg).toBe('HS256');
    expect(payload.name).toBe('John Doe');
  });

  // UUID Validation Test
  it('validates UUID v4 format correctly', () => {
    const uuid = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-([1-8])[0-9a-f]{3}-([89ab])[0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(regex.test(uuid)).toBe(true);
  });

  // Regex Matcher Test
  it('matches emails with regular expressions', () => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    expect(emailRegex.test('support@devtoolbox.co')).toBe(true);
    expect(emailRegex.test('invalid-email')).toBe(false);
  });

  // Timestamp Converter Test
  it('converts unix timestamp to date correctly', () => {
    const epochSec = 1700000000;
    const d = new Date(epochSec * 1000);
    expect(d.getUTCFullYear()).toBe(2023);
  });

});
