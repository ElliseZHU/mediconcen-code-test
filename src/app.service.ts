import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRecord } from './user-record.entity';
import { CreateRecordDto } from './create-record.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserRecord)
    private readonly userRecordRepository: Repository<UserRecord>,
  ) {}

  async processRecord(dto: CreateRecordDto): Promise<{ userID: string }> {
    const { id1, id2 } = dto;

    try {
      // 1. 檢查資料庫是否已存在相同的 id1 與 id2 組合
      const existingRecord = await this.userRecordRepository.findOne({
        where: { id1, id2 },
      });

      if (existingRecord) {
        return { userID: existingRecord.userID };
      }

      // 2. 若不存在，使用 UUID v4 產生新的 userID
      const newUserID = uuidv4();

      // 3. 儲存至資料庫
      const newRecord = this.userRecordRepository.create({
        id1,
        id2,
        userID: newUserID,
      });

      await this.userRecordRepository.save(newRecord);

      return { userID: newUserID };
    } catch (error) {
      // 確保未預期的錯誤不會導致應用程式崩潰，並妥善處理
      throw new InternalServerErrorException('An error occurred while processing the request.');
    }
  }
}
