<template>
  <Story>
    <Variant title="Colors">
      <section :class="styles.section">
        <div v-for="(value, color) in variableGroups.colors" :key="color" :class="styles.block">
          <div :style="{ '--color': `var(${color})` }" />
          <Typography variant="text-m-1">{{ value }}</Typography>
          <Typography variant="text-m-1">{{ color }}</Typography>
        </div>
      </section>
    </Variant>

    <Variant title="Spacings">
      <section :class="styles.section">
        <div
          v-for="(value, spacing) in variableGroups.spacings"
          :key="spacing"
          :class="styles.block"
        >
          <div :style="{ '--size': `var(${spacing})`, '--radius': '0px' }" />
          <Typography variant="text-m-1">{{ value }}</Typography>
          <Typography variant="text-m-1">{{ spacing }}</Typography>
        </div>
      </section>
    </Variant>

    <Variant title="Radiuses">
      <section :class="styles.section">
        <div v-for="(value, radius) in variableGroups.radiuses" :key="radius" :class="styles.block">
          <div :style="{ '--radius': `var(${radius})` }" />
          <Typography variant="text-m-1">{{ value }}</Typography>
          <Typography variant="text-m-1">{{ radius }}</Typography>
        </div>
      </section>
    </Variant>

    <Variant title="Media">
      <section :class="styles.section">
        <div v-for="media in mediaVariables" :key="media" :class="styles.block">
          <Typography variant="text-m-1">{{ media }}</Typography>
        </div>
      </section>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { Typography } from 'shared/ui';

import styles from './story.module.css';

interface VariableGroups {
  colors: Record<string, string>;
  spacings: Record<string, string>;
  radiuses: Record<string, string>;
}
type MediaVariables = string[];

const groupPrefixes: Record<keyof VariableGroups, string> = {
  colors: '--palette',
  spacings: '--margin',
  radiuses: '--radius',
};

const checkGroup = (name?: string): keyof VariableGroups | undefined => {
  if (!name) {
    return undefined;
  }

  return Object.keys(groupPrefixes).find((prefixKey) => {
    return name.startsWith(groupPrefixes[prefixKey as keyof VariableGroups]);
  }) as keyof VariableGroups | undefined;
};

const getVariablesByGroup = async (): Promise<VariableGroups> => {
  const file = JSON.stringify((await import('./variables.css?inline')) || {});

  const match = file.match(/(--[^:]+: ?[^;]+);/gim) || [];

  return match.reduce(
    (accum, current) => {
      const [, name, value] = current.match(/(--[^:]+): ?([^;]+);/i) as [string, string, string];
      const group = checkGroup(name);
      if (name && value && group) {
        accum[group][name] = value;
      }
      return accum;
    },
    {
      colors: {},
      radiuses: {},
      spacings: {},
    } as VariableGroups,
  );
};

const getMediaVariables = async (): Promise<MediaVariables> => {
  // media.css file cannot be imported because post-css removes the contents for its purposes
  const file: string = `
    @custom-media --media-mobile (max-width: 755px);
    @custom-media --media-tablet (min-width: 756px);
    @custom-media --media-desktop (min-width: 1024px);
  `;
  return file.match(/@custom-media ((--[^ ]+) ?(\([^;]+\)));/gim) || [];
};

const variableGroups = ref<VariableGroups>({
  colors: {},
  radiuses: {},
  spacings: {},
});
const mediaVariables = ref<MediaVariables>([]);

onMounted(async () => {
  variableGroups.value = await getVariablesByGroup();
  mediaVariables.value = await getMediaVariables();
});
</script>
