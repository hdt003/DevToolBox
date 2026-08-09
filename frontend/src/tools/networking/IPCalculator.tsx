import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { Network, AlertCircle } from 'lucide-react';

export const IPCalculator: React.FC = () => {
  const [cidrInput, setCidrInput] = useState('192.168.1.0/24');

  const ipToInt = (ip: string) => {
    return ip.split('.').reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0);
  };

  const intToIp = (int: number) => {
    return [
      (int >>> 24) & 255,
      (int >>> 16) & 255,
      (int >>> 8) & 255,
      int & 255,
    ].join('.');
  };

  const intToBinary = (int: number) => {
    return [
      ((int >>> 24) & 255).toString(2).padStart(8, '0'),
      ((int >>> 16) & 255).toString(2).padStart(8, '0'),
      ((int >>> 8) & 255).toString(2).padStart(8, '0'),
      (int & 255).toString(2).padStart(8, '0'),
    ].join('.');
  };

  const calculateSubnet = () => {
    const parts = cidrInput.trim().split('/');
    if (parts.length !== 2) return null;

    const ipStr = parts[0];
    const prefix = parseInt(parts[1], 10);

    if (isNaN(prefix) || prefix < 0 || prefix > 32) return null;
    const ipOctets = ipStr.split('.');
    if (ipOctets.length !== 4 || ipOctets.some((o) => isNaN(parseInt(o, 10)) || parseInt(o, 10) < 0 || parseInt(o, 10) > 255)) {
      return null;
    }

    const ipInt = ipToInt(ipStr);
    const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    const wildcardInt = (~maskInt) >>> 0;

    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | wildcardInt) >>> 0;

    const totalHosts = Math.pow(2, 32 - prefix);
    const usableHosts = prefix >= 31 ? 0 : totalHosts - 2;

    const firstUsableInt = prefix >= 31 ? networkInt : networkInt + 1;
    const lastUsableInt = prefix >= 31 ? broadcastInt : broadcastInt - 1;

    return {
      ip: ipStr,
      cidr: prefix,
      netmask: intToIp(maskInt),
      wildcard: intToIp(wildcardInt),
      network: intToIp(networkInt),
      broadcast: intToIp(broadcastInt),
      firstUsable: intToIp(firstUsableInt),
      lastUsable: intToIp(lastUsableInt),
      usableHosts: usableHosts.toLocaleString(),
      binaryIp: intToBinary(ipInt),
      binaryMask: intToBinary(maskInt),
    };
  };

  const result = calculateSubnet();

  return (
    <div className="space-y-6">
      
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          Enter IPv4 CIDR Address (e.g. 192.168.1.0/24 or 10.0.0.0/16)
        </label>
        <input
          type="text"
          className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-base font-bold text-brand-300 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800"
          placeholder="192.168.1.0/24"
          value={cidrInput}
          onChange={(e) => setCidrInput(e.target.value)}
        />
      </div>

      {!result ? (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
          <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
          <span>Invalid CIDR IPv4 format. Example: 192.168.1.0/24</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Network Address', val: result.network },
              { label: 'Broadcast Address', val: result.broadcast },
              { label: 'Subnet Mask', val: result.netmask },
              { label: 'Wildcard Mask', val: result.wildcard },
              { label: 'First Usable Host', val: result.firstUsable },
              { label: 'Last Usable Host', val: result.lastUsable },
              { label: 'Usable Hosts Count', val: result.usableHosts },
              { label: 'CIDR Prefix', val: `/${result.cidr}` },
            ].map(({ label, val }) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span>{label}</span>
                  <CopyButton value={val} size="sm" />
                </div>
                <p className="font-mono text-sm font-bold text-slate-900 dark:text-white">{val}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Binary Representation
            </h4>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">IP Binary:</span>
                <span className="text-brand-600 dark:text-brand-400 font-bold">{result.binaryIp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mask Binary:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">{result.binaryMask}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default IPCalculator;
