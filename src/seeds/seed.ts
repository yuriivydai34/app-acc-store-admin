import { dataSource } from '../../data-source';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  await dataSource.initialize();
  const userRepo = dataSource.getRepository(User);
  
  const hashedPassword1 = await bcrypt.hash('admin', 10);
  await userRepo.save({ username: 'admin', password: hashedPassword1, isAdmin: true });

  const hashedPassword2 = await bcrypt.hash('changeme', 10);
  await userRepo.save({ username: 'john', password: hashedPassword2, isAdmin: false });

  await dataSource.destroy();
}

seed().then(() => console.log('Seeding complete')).catch(console.error);