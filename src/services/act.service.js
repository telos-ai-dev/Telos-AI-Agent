const Exercise = require('../models/Exercise');

class ACTService {
    async getAllExercises() {
        try {
            return await Exercise.find();
        } catch (error) {
            throw new Error(`Failed to get exercises: ${error.message}`);
        }
    }

    async getExerciseById(id) {
        try {
            const exercise = await Exercise.findById(id);
            if (!exercise) {
                throw new Error('Exercise not found');
            }
            return exercise;
        } catch (error) {
            throw new Error(`Failed to get exercise: ${error.message}`);
        }
    }

    async createExercise(exerciseData) {
        try {
            const exercise = new Exercise(exerciseData);
            await exercise.save();
            return exercise;
        } catch (error) {
            throw new Error(`Failed to create exercise: ${error.message}`);
        }
    }

    async updateExercise(id, exerciseData) {
        try {
            const exercise = await Exercise.findByIdAndUpdate(
                id,
                exerciseData,
                { new: true }
            );
            if (!exercise) {
                throw new Error('Exercise not found');
            }
            return exercise;
        } catch (error) {
            throw new Error(`Failed to update exercise: ${error.message}`);
        }
    }

    async deleteExercise(id) {
        try {
            const exercise = await Exercise.findByIdAndDelete(id);
            if (!exercise) {
                throw new Error('Exercise not found');
            }
            return exercise;
        } catch (error) {
            throw new Error(`Failed to delete exercise: ${error.message}`);
        }
    }

    async getExercisesByCategory(category) {
        try {
            return await Exercise.find({ category });
        } catch (error) {
            throw new Error(`Failed to get exercises by category: ${error.message}`);
        }
    }

    async getExercisesByLevel(level) {
        try {
            return await Exercise.find({ level });
        } catch (error) {
            throw new Error(`Failed to get exercises by level: ${error.message}`);
        }
    }
}

module.exports = new ACTService(); 