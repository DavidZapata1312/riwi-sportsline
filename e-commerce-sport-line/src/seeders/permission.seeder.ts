import { Repository } from 'typeorm';
import { Permission } from 'src/permission/entities/permission.entity';

export async function seedPermissions(permissionRepo: Repository<Permission>) {
  const names = [
    'user.create',
    'user.read.one',
    'user.read.all',
    // agrega más cuando necesites:
    // 'product.create', 'product.read', 'order.create', etc.
  ];

  const existing = await permissionRepo.find();
  const existingNames = new Set(existing.map((p) => p.name));

  const toInsert = names
    .filter((n) => !existingNames.has(n))
    .map((name) => permissionRepo.create({ name }));

  if (toInsert.length) await permissionRepo.save(toInsert);

  const perms = await permissionRepo.find();
  console.log(`✅ Permisos listos: ${perms.map((p) => p.name).join(', ')}`);
  return perms;
}
