/**
 * Utility functions for mission identification and processing
 */

/**
 * Identifies if a mission is a daily mission based on multiple criteria
 * @param mission - The mission object to check
 * @returns true if the mission is identified as a daily mission
 */
export const isDailyMission = (mission: any): boolean => {
  // Check multiple criteria to identify daily missions
  const missionName = mission.name?.toLowerCase() || '';
  const missionDescription = mission.description?.toLowerCase() || '';
  const missionCategory = mission.category?.toLowerCase() || '';
  
  // Daily mission indicators:
  // 1. Mission name contains "daily"
  // 2. Mission description contains "daily" 
  // 3. Mission category is "daily"
  // 4. Mission has step-related objectives (for step tracking missions)
  const hasDailyKeywords = missionName.includes('daily') || 
                         missionDescription.includes('daily') || 
                         missionCategory === 'daily';
  
  // Check if mission has step-related events (for step tracking)
  const hasStepEvents = mission.objectives?.events?.some((event: any) => 
    event.id?.toLowerCase().includes('step') || 
    event.name?.toLowerCase().includes('step')
  );
  
  const isDaily = hasDailyKeywords || hasStepEvents;
  
  // Log for debugging
  if (isDaily) {
    console.log(`Daily mission detected: ${mission.id} - ${mission.name}`, {
      hasDailyKeywords,
      hasStepEvents,
      missionName,
      missionCategory
    });
  }
  
  return isDaily;
};

/**
 * Finds the first daily mission from a list of missions
 * @param missions - Array of mission objects
 * @returns The first daily mission found, or null if none found
 */
export const findDailyMission = (missions: any[]): any | null => {
  return missions.find(mission => isDailyMission(mission)) || null;
};

/**
 * Finds all daily missions from a list of missions
 * @param missions - Array of mission objects
 * @returns Array of daily missions
 */
export const findAllDailyMissions = (missions: any[]): any[] => {
  return missions.filter(mission => isDailyMission(mission));
};

/**
 * Extracts progress data from a mission or mission progress response
 * @param missionData - Mission data or mission progress response
 * @param fallbackMission - Fallback mission object if missionData doesn't have progress
 * @returns Object with target, currentProgress, and progressPercentage
 */
export const extractProgressData = (missionData: any, fallbackMission?: any) => {
  // Try to get progress from individual mission data first
  const target = missionData?.progress?.events?.[0]?.count || 
                fallbackMission?.objectives?.events?.[0]?.count || 1;
  
  const currentProgress = missionData?.progress?.events?.[0]?.currentCount || 
                        fallbackMission?.objectives?.events?.[0]?.currentCount || 0;
  
  const progressPercentage = Math.min((currentProgress / target) * 100, 100);
  
  return {
    target,
    currentProgress,
    progressPercentage
  };
};
