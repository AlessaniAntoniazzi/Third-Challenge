import { Schema } from 'mongoose'; 
import UserModel from '../models/models';

describe('UserModel', () => {
  describe('userSchema', () => {
    it('should require firstName', () => {
      const user = new UserModel();
      const validation = user.validateSync();
      const errors = validation ? validation.errors : null;

      expect(errors?.firstName).toBeDefined();
    });

    it('should require lastName', () => {
      const user = new UserModel();
      const validation = user.validateSync();
      const errors = validation ? validation.errors : null;

      expect(errors?.lastName).toBeDefined();
    });

    it('should require birthDate', () => {
      const user = new UserModel();
      const validation = user.validateSync();
      const errors = validation ? validation.errors : null;

      expect(errors?.birthDate).toBeDefined();
    });

    it('should require city', () => {
      const user = new UserModel();
      const validation = user.validateSync();
      const errors = validation ? validation.errors : null;

      expect(errors?.city).toBeDefined();
    });

    it('should require country', () => {
      const user = new UserModel();
      const validation = user.validateSync();
      const errors = validation ? validation.errors : null;

      expect(errors?.country).toBeDefined();
    });

    it('should require email', () => {
      const user = new UserModel();
      const validation = user.validateSync();
      const errors = validation ? validation.errors : null;

      expect(errors?.email).toBeDefined();
    });

    it('should require password', () => {
      const user = new UserModel();
      const validation = user.validateSync();
      const errors = validation ? validation.errors : null;

      expect(errors?.password).toBeDefined();
    });

    it('should require confirmPassword', () => {
      const user = new UserModel();
      const validation = user.validateSync();
      const errors = validation ? validation.errors : null;

      expect(errors?.confirmPassword).toBeDefined();
    });
  });
});