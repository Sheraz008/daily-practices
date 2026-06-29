import { LinearGradient } from 'expo-linear-gradient';
import { memo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnySvg, type IconName } from '@components/AnySvg';
import { ErrorState, LoadingState } from '@components/StateViews';
import { ProgressBar } from '@components/ProgressBar';
import { ProgressRing } from '@components/ProgressRing';
import { colors } from '@theme/colors';
import { mvs } from '@theme/responsive';
import { useSummary } from './useSummary';
import { styles } from './styles';

interface Tile {
  key: string;
  iconName: IconName;
  iconColor: string;
  iconBg: string;
  value: string;
  label: string;
}

const Summary = () => {
  const { summary, isError, onRetry } = useSummary();

  if (isError) {
    return (
      <SafeAreaView style={styles.fill}>
        <ErrorState onRetry={onRetry} />
      </SafeAreaView>
    );
  }

  if (!summary) {
    return (
      <SafeAreaView style={styles.fill}>
        <LoadingState label="Crunching your day…" />
      </SafeAreaView>
    );
  }

  const ratio = summary.total > 0 ? summary.completedToday / summary.total : 0;
  const percent = Math.round(ratio * 100);

  const tiles: Tile[] = [
    {
      key: 'completed',
      iconName: 'check',
      iconColor: colors.SUCCESS,
      iconBg: colors.SUCCESS_SOFT,
      value: String(summary.completedToday),
      label: 'Completed',
    },
    {
      key: 'rating',
      iconName: 'star',
      iconColor: colors.STAR,
      iconBg: colors.STAR_SOFT,
      value: summary.averageRating !== null ? summary.averageRating.toFixed(1) : '—',
      label: 'Avg rating',
    },
    {
      key: 'total',
      iconName: 'chart',
      iconColor: colors.PRIMARY,
      iconBg: colors.PRIMARY_SOFT,
      value: String(summary.total),
      label: 'Practices',
    },
  ];

  return (
    <SafeAreaView style={styles.fill}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Today’s Summary</Text>
        <Text style={styles.subheading}>Here’s how your practice is going.</Text>

        <LinearGradient
          colors={[colors.GRADIENT_START, colors.GRADIENT_END]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>
              {percent >= 100 ? 'All done!' : percent >= 50 ? 'Great progress!' : 'Keep it up!'}
            </Text>
            <Text style={styles.heroSubtitle}>
              {summary.completedToday} of {summary.total} practices done today
            </Text>
          </View>

          <ProgressRing
            size={mvs(104)}
            strokeWidth={mvs(10)}
            progress={ratio}
            color={colors.WHITE}
            trackColor={colors.OVERLAY_LIGHT}
          >
            <Text style={styles.ringValue}>{percent}%</Text>
            <Text style={styles.ringLabel}>done</Text>
          </ProgressRing>
        </LinearGradient>

        <View style={styles.tileRow}>
          {tiles.map((tile) => (
            <View key={tile.key} style={styles.tile} testID={`stat-${tile.key}`}>
              <View style={[styles.tileIcon, { backgroundColor: tile.iconBg }]}>
                <AnySvg name={tile.iconName} size={mvs(18)} color={tile.iconColor} />
              </View>
              <Text style={styles.tileValue}>{tile.value}</Text>
              <Text style={styles.tileLabel}>{tile.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.progressCard} testID="stat-progress">
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Daily goal</Text>
            <Text style={styles.progressPercent}>{percent}%</Text>
          </View>
          <View style={styles.progressTrackWrap}>
            <ProgressBar
              progress={ratio}
              height={mvs(10)}
              trackColor={colors.SURFACE_MUTED}
              fillColor={colors.PRIMARY}
            />
          </View>
          <Text style={styles.progressNote}>
            {summary.ratedCount > 0
              ? `Average across ${summary.ratedCount} rated practice${
                  summary.ratedCount === 1 ? '' : 's'
                }.`
              : 'Rate a completed practice to see your average.'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(Summary);
