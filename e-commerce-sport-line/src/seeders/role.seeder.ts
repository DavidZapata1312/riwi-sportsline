import { Repository } from 'typeorm';
import { Role } from 'src/user/entities/role.entity';

export async function seedRoles(roleRepo: Repository<Role>) {
  const names = ['admin', 'user'];

  const existing = await roleRepo.find();
  const existingNames = new Set(existing.map((r) => r.name));

  const toInsert = names
    .filter((n) => !existingNames.has(n))
    .map((name) => roleRepo.create({ name }));

  if (toInsert.length) await roleRepo.save(toInsert);

  const roles = await roleRepo.find();
  console.log(`✅ Roles listos: ${roles.map((r) => r.name).join(', ')}`);
  return roles;
}
