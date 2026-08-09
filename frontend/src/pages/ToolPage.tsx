import React from 'react';
import { useParams } from 'react-router-dom';
import { getToolBySlug } from '../data/toolsRegistry';
import { ToolWrapper } from '../components/tools/ToolWrapper';
import { NotFoundPage } from './NotFound';

// Static imports for instant rendering without dynamic loading delays
import JSONFormatter from '../tools/json/JSONFormatter';
import JSONValidator from '../tools/json/JSONValidator';
import JSONToCSV from '../tools/json/JSONToCSV';
import CSVToJSON from '../tools/json/CSVToJSON';
import Base64Tool from '../tools/encoding/Base64Tool';
import URLEncoder from '../tools/encoding/URLEncoder';
import HTMLEntityTool from '../tools/encoding/HTMLEntityTool';
import JWTDecoder from '../tools/security/JWTDecoder';
import HashGenerator from '../tools/security/HashGenerator';
import PasswordGenerator from '../tools/security/PasswordGenerator';
import RegexTester from '../tools/regex/RegexTester';
import RegexGenerator from '../tools/regex/RegexGenerator';
import TimestampConverter from '../tools/time/TimestampConverter';
import UnixTimestamp from '../tools/time/UnixTimestamp';
import CronGenerator from '../tools/cron/CronGenerator';
import CronParser from '../tools/cron/CronParser';
import SQLFormatter from '../tools/sql/SQLFormatter';
import SQLMinifier from '../tools/sql/SQLMinifier';
import HTMLFormatter from '../tools/web/HTMLFormatter';
import CSSFormatter from '../tools/web/CSSFormatter';
import JSFormatter from '../tools/web/JSFormatter';
import XMLFormatter from '../tools/web/XMLFormatter';
import YAMLJSONConverter from '../tools/web/YAMLJSONConverter';
import JSONYAMLConverter from '../tools/web/JSONYAMLConverter';
import MarkdownHTML from '../tools/web/MarkdownHTML';
import IPCalculator from '../tools/networking/IPCalculator';
import HTTPStatusCodes from '../tools/networking/HTTPStatusCodes';
import MIMELookup from '../tools/networking/MIMELookup';
import UserAgentParser from '../tools/networking/UserAgentParser';
import UUIDGenerator from '../tools/generators/UUIDGenerator';
import UUIDValidator from '../tools/generators/UUIDValidator';
import ColorConverter from '../tools/generators/ColorConverter';

export const ToolPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <NotFoundPage />;

  const tool = getToolBySlug(slug);
  if (!tool) return <NotFoundPage />;

  const renderToolContent = () => {
    switch (tool.id) {
      case 'json-formatter':
        return <JSONFormatter />;
      case 'json-validator':
        return <JSONValidator />;
      case 'json-to-csv':
        return <JSONToCSV />;
      case 'csv-to-json':
        return <CSVToJSON />;
      case 'base64-encoder-decoder':
        return <Base64Tool />;
      case 'url-encoder-decoder':
        return <URLEncoder />;
      case 'html-entity-encoder-decoder':
        return <HTMLEntityTool />;
      case 'jwt-decoder':
        return <JWTDecoder />;
      case 'hash-generator':
        return <HashGenerator />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'regex-tester':
        return <RegexTester />;
      case 'regex-generator':
        return <RegexGenerator />;
      case 'timestamp-converter':
        return <TimestampConverter />;
      case 'unix-timestamp':
        return <UnixTimestamp />;
      case 'cron-generator':
        return <CronGenerator />;
      case 'cron-parser':
        return <CronParser />;
      case 'sql-formatter':
        return <SQLFormatter />;
      case 'sql-minifier':
        return <SQLMinifier />;
      case 'html-formatter':
        return <HTMLFormatter />;
      case 'css-formatter':
        return <CSSFormatter />;
      case 'javascript-formatter':
        return <JSFormatter />;
      case 'xml-formatter':
        return <XMLFormatter />;
      case 'yaml-json-converter':
        return <YAMLJSONConverter />;
      case 'json-yaml-converter':
        return <JSONYAMLConverter />;
      case 'markdown-html':
        return <MarkdownHTML />;
      case 'ip-calculator':
        return <IPCalculator />;
      case 'http-status-codes':
        return <HTTPStatusCodes />;
      case 'mime-type-lookup':
        return <MIMELookup />;
      case 'user-agent-parser':
        return <UserAgentParser />;
      case 'uuid-generator':
        return <UUIDGenerator />;
      case 'uuid-validator':
        return <UUIDValidator />;
      case 'color-converter':
        return <ColorConverter />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <ToolWrapper tool={tool}>
      {renderToolContent()}
    </ToolWrapper>
  );
};
