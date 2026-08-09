import { describe, it, expect } from 'vitest';
import { TOOLS, CATEGORIES, getToolBySlug } from '../data/toolsRegistry';

describe('UI Links & Tool Routing Integrity Suite', () => {
  
  it('contains exactly 32 defined tools in the central registry', () => {
    expect(TOOLS.length).toBe(32);
  });

  it('verifies every tool has valid slug, category, title, and description', () => {
    TOOLS.forEach((tool) => {
      expect(tool.id).toBeTruthy();
      expect(tool.name).toBeTruthy();
      expect(tool.slug).toBeTruthy();
      expect(tool.category).toBeTruthy();
      expect(tool.description).toBeTruthy();
      expect(tool.seoTitle).toBeTruthy();
      expect(tool.seoDescription).toBeTruthy();
    });
  });

  it('resolves every tool slug via getToolBySlug', () => {
    TOOLS.forEach((tool) => {
      const resolved = getToolBySlug(tool.slug);
      expect(resolved).toBeDefined();
      expect(resolved?.id).toBe(tool.id);
    });
  });

  it('verifies all 10 categories exist and contain tools', () => {
    expect(CATEGORIES.length).toBe(10);
    CATEGORIES.forEach((cat) => {
      const toolsInCat = TOOLS.filter((t) => t.category === cat.id);
      expect(toolsInCat.length).toBeGreaterThan(0);
    });
  });

});
